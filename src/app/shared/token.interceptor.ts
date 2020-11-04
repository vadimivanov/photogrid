import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders
} from '@angular/common/http';
import { DataService } from './data.service';
import { Observable, from  } from 'rxjs';
import { tap } from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: DataService,
              private router: Router) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.getToken()}`
      }
    });
    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
      if (event.type > 0 ) {
        console.log('intercept resp ---> ', event);
      }
    }, (err: any) => {
      if (err) {
        if (err.status === 401) {
          console.log('intercept err ---> ', err);
          this.auth.auth().subscribe(data => {
            this.router.navigate(['/home']);
          });
        }
      }
    }));
  }
}
