import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JwtModule } from "@auth0/angular-jwt";

import { AuthenticateService } from './authenticate.service';
import { AuthGuardService } from './auth-guard.service';
import { GuestGuardService } from './guest-guard.service';

const SERVICES = [
  AuthenticateService,
  AuthGuardService,
  GuestGuardService,
];

@NgModule({
  imports: [
    CommonModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem("jwt_token");
        },
      },
    }),
  ],
  providers: [
    ...SERVICES,
  ],
})
export class GuardModule {
  static forRoot(): ModuleWithProviders<GuardModule> {
    return {
      ngModule: GuardModule,
      providers: [
        ...SERVICES,
      ],
    };
  }
}
