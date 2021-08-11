import { Observable } from 'rxjs';

export abstract class AuthData {
    abstract register(formData: FormData): Observable<Object>;
    abstract login(formData: FormData): Observable<Object>;
}