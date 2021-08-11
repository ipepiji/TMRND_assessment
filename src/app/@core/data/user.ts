import { Observable } from 'rxjs';

export abstract class UserData {
    abstract getTasks(): Observable<Object>;
    abstract getTask(id: string): Observable<Object>;
    abstract getSubtask(id: string): Observable<Object>;
    abstract createSubtask(formData: FormData): Observable<Object>;
    abstract updateSubtask(formData: FormData, id: string): Observable<Object>;
    abstract deleteSubtask(id: string): Observable<Object>;
}