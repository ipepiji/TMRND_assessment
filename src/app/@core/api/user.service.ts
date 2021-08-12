import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserData } from '../data/user';

@Injectable()
export class UserService implements UserData {

  private visa: string;
  url: string = `${environment.api_url}/api/v1/user`;
  headers: HeadersInit;
  requestOptions: Object;

  constructor(private http: HttpClient) { }

  setLocalStorage(): void {
    this.visa = localStorage.getItem('token');
    this.headers = {
      'Authorization': `Bearer ${this.visa}`,
    };

    this.requestOptions = {
      headers: this.headers,
    };
  }

  getTasks(): Observable<Object> {
    this.setLocalStorage();
    const url = `${this.url}/task`;
    return this.http.get(url, this.requestOptions);
  }

  getTask(date: any): Observable<Object> {
    this.setLocalStorage();
    const url = `${this.url}/task/query?date=${date}`;
    return this.http.get(url, this.requestOptions);
  }

  getSubtask(id: number): Observable<Object> {
    this.setLocalStorage();
    const url = `${this.url}/subtask/${id}`;
    return this.http.get(url, this.requestOptions);
  }

  createSubtask(formData: FormData): Observable<Object> {
    this.setLocalStorage();
    const url = `${this.url}/subtask`;
    return this.http.post(url, formData, this.requestOptions);
  }

  updateSubtask(formData: FormData, id: number): Observable<Object> {
    this.setLocalStorage();
    const url = `${this.url}/subtask/${id}`;
    return this.http.put(url, formData, this.requestOptions);
  }

  deleteSubtask(id: number): Observable<Object> {
    this.setLocalStorage();
    const url = `${this.url}/subtask/${id}`;
    return this.http.delete(url, this.requestOptions);
  }
}
