import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAuthModule } from '@nebular/auth';

import { throwIfAlreadyLoaded } from './module-import-guard';
import {
  AnalyticsService,
  LayoutService,
  SeoService,
  StateService,
  CommonService,
} from './utils';

import { AuthData } from './data/auth';
import { AuthService } from './api/auth.service';
import { UserData } from './data/user';
import { UserService } from './api/user.service';
import { ApiModule } from './api/api.module';

import { GuardModule } from './guard/guard.module';

const DATA_SERVICES = [
  { provide: AuthData, useClass: AuthService },
  { provide: UserData, useClass: UserService },
];


export const NB_CORE_PROVIDERS = [
  ...ApiModule.forRoot().providers,
  ...DATA_SERVICES,
  AnalyticsService,
  LayoutService,
  SeoService,
  StateService,
  CommonService,
];

@NgModule({
  imports: [
    CommonModule,
    GuardModule,
  ],
  exports: [
    NbAuthModule,
  ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}
