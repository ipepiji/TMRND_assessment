import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthData } from '../data/auth';

@Injectable()
export class AuthService implements AuthData {

  url: string = `${environment.api_url}/api/v1/auth`;
  headers: HeadersInit;
  requestOptions: Object;

  constructor(private http: HttpClient) { }

  register(formData: FormData): Observable<Object> {
    const url = `${this.url}/register`;
    return this.http.post(url, formData);
  }

  login(formData: FormData): Observable<Object> {
    const url = `${this.url}/login`;
    return this.http.post(url, formData);
  }
}
