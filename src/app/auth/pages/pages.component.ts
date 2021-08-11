/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'ngx-auth',
  styleUrls: ['./pages.component.scss'],
  template: `
     <nb-layout>
       <nb-layout-column>
        <div class="row">
          <nb-card>
            <nb-card-body>
              <div class="col-12 card">
                <nav class="navigation" *ngIf="page === 'register';">
                  <a href="#" (click)="back()" class="link back-link" aria-label="Back">
                    <nb-icon icon="arrow-circle-left-outline" [options]="{ animation: { type: 'pulse' } }" status="primary" title="Back"></nb-icon>
                  </a>
                </nav>
                <ngx-auth-block>
                  <router-outlet></router-outlet>
                </ngx-auth-block>
              </div>
            </nb-card-body>
          </nb-card>
        </div>
        </nb-layout-column>
     </nb-layout>
   `,
})
export class PagesComponent implements OnDestroy {

  private destroy$ = new Subject<void>();

  subscription: any;
  page: string;

  authenticated: boolean = false;
  token: string = '';

  // showcase of how to use the onAuthenticationChange method
  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    )
      .subscribe((event: NavigationEnd) => {
        this.page = event.urlAfterRedirects.split('/')[2].toString();
      });
  }

  back() {
    this.router.navigate(['auth']);
    return false;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
