import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthenticateService {

    constructor(public jwtHelper: JwtHelperService) { }

    public isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        return !this.jwtHelper.isTokenExpired(token);
    }
}