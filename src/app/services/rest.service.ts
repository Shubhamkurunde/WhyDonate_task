import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  url = 'http://localhost:5000';
  constructor(private http: HttpClient) {}

  gettoken() {
    const token = localStorage.getItem('token');
    if (token) {
      return token;
    } else {
      return undefined;
    }
  }

  login(data: any) {
    return this.http.post(this.url + '/api/login', data);
  }

  search(data: any) {
    const headers = new HttpHeaders({
      token: localStorage.getItem('token')
    });
    return this.http.post(this.url + '/api/search', data, { headers });
  }
}
