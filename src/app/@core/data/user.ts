import { Observable } from 'rxjs';

export abstract class UserData {
    abstract getTasks(): Observable<Object>;
    abstract getTask(date: any): Observable<Object>;
    abstract getSubtask(id: number): Observable<Object>;
    abstract createSubtask(formData: FormData): Observable<Object>;
    abstract updateSubtask(formData: FormData, id: number): Observable<Object>;
    abstract deleteSubtask(id: number): Observable<Object>;
}