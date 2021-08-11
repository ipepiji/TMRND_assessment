import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
} from '@angular/router';
import { AuthenticateService } from './authenticate.service';

@Injectable()
export class GuestGuardService implements CanActivate {

  constructor(public auth: AuthenticateService,
    public router: Router) { }

  canActivate(): boolean {
    try {
      const token = localStorage.getItem('token');
      if (token && this.auth.isAuthenticated()) {
        this.router.navigateByUrl('user');
        return false;
      }

      return true;
    } catch (error) {
      return true;
    }
  }

}