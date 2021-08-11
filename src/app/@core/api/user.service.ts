import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserData } from '../data/user';

@Injectable()
export class UserService implements UserData {

  private visa: string = localStorage.getItem('token');
  url: string = `${environment.api_url}/api/v1/user`;
  headers: HeadersInit;
  requestOptions: Object;

  constructor(private http: HttpClient) {
    this.headers = {
      'Authorization': `Bearer ${this.visa}`,
    };

    this.requestOptions = {
      headers: this.headers,
    };
  }

  getTasks(): Observable<Object> {
    const url = `${this.url}/task`;
    return this.http.get(url, this.requestOptions);
  }

  getTask(id: string): Observable<Object> {
    const url = `${this.url}/task/${id}`;
    return this.http.get(url, this.requestOptions);
  }

  getSubtask(id: string): Observable<Object> {
    const url = `${this.url}/subtask/${id}`;
    return this.http.get(url, this.requestOptions);
  }

  createSubtask(formData: FormData): Observable<Object> {
    const url = `${this.url}/subtask`;
    return this.http.post(url, formData, this.requestOptions);
  }

  updateSubtask(formData: FormData, id: string): Observable<Object> {
    const url = `${this.url}/subtask/${id}`;
    return this.http.put(url, formData, this.requestOptions);
  }

  deleteSubtask(id: string): Observable<Object> {
    const url = `${this.url}/subtask/${id}`;
    return this.http.delete(url, this.requestOptions);
  }
}
