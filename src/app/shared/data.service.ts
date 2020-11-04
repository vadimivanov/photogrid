import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {Observable, forkJoin} from 'rxjs';

interface Token {
  token: string;
}
@Injectable({
  providedIn: 'root'
})
export class DataService {

  static baseUrl = 'http://interview.agileengine.com';

  constructor(private http: HttpClient) {
  }

  getToken() {
    if (localStorage.getItem('token')) {
      return localStorage.getItem('token');
    }
  }
  auth() {
    const headers = new HttpHeaders();
    headers.set('Authorization', 'Bearer ce09287c97bf310284be3c97619158cfed026004');
    return this.http.post<Token>(`${DataService.baseUrl}/auth`,{apiKey: '23567b218376f79d9415'}).pipe(map(token => {
      localStorage.setItem('token', token.token);
    }));
  }
  getPhotoList(): Observable<any> {
    const headers = new HttpHeaders();
    return this.http.get(`${DataService.baseUrl}/images?page=1`, {headers}).pipe(map(data => {
      return data;
    }));
  }
  getDetails(photoId): Observable<any> {
    const headers = new HttpHeaders();
    return this.http.get(`${DataService.baseUrl}/images/${photoId}`, {headers}).pipe(map(photo => {
      return photo;
    }));
  }
}
