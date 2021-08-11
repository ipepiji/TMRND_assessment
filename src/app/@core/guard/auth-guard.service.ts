import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
} from '@angular/router';
import { AuthenticateService } from './authenticate.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthenticateService,
    public router: Router) { }

  canActivate(): boolean {
    try {
      const token = localStorage.getItem('token');
      if (!token || !this.auth.isAuthenticated()) {
        this.router.navigateByUrl('auth');
        return false;
      }

      return true;
    } catch (error) {
      this.router.navigateByUrl('auth');
      return false;
    }
  }

}