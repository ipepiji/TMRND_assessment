import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-auth-logout',
  templateUrl: './logout.component.html',
})
export class LogoutComponent implements OnInit {

  constructor(protected router: Router) { }

  ngOnInit(): void {
    this.logout();
  }

  logout(): void {
    localStorage.removeItem("token");
    const redirect = "auth";
    this.router.navigateByUrl(redirect);
  }
}
