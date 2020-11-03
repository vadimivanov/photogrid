import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {Observable, forkJoin} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  static baseUrl = 'http://interview.agileengine.com';

  constructor(private http: HttpClient) {
  }

  auth() {
    const headers = new HttpHeaders();
    headers.set('Authorization', 'Bearer ce09287c97bf310284be3c97619158cfed026004');
    return this.http.post(`${DataService.baseUrl}/auth`,{apiKey: '23567b218376f79d9415'}).pipe(map(token => {
      return token;
    }));
  };
  getPhotoList(): Observable<any> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Authorization', 'Bearer  cdf14b484fe353c623716ba0136fb17e02fbcf21'); //token from auth endpoint
    return this.http.get(`${DataService.baseUrl}/images?page=1`, {headers}).pipe(map(data => {
      console.log('getphotos ---> ', data);
      return data;
    }));
  }

  getDetails(photoId): Observable<any> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Authorization', 'Bearer  cdf14b484fe353c623716ba0136fb17e02fbcf21');
    return this.http.get(`${DataService.baseUrl}/images/$${photoId}`, {headers}).pipe(map(photo => {
      console.log('photo ---> ', photo);
      return photo;
    }));
  }
}
