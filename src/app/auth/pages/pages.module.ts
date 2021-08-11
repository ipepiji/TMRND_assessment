import { NgModule } from '@angular/core';
import {
  NbLayoutModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbPopoverModule,
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { AuthBlockComponent } from './auth-block/auth-block.component';

import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { LogoutModule } from './logout/logout.module';
import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
  imports: [
    NbLayoutModule,
    NbCardModule,
    NbIconModule,
    NbInputModule,
    NbPopoverModule,
    PagesRoutingModule,
    ThemeModule,
    LoginModule,
    RegisterModule,
    LogoutModule,
  ],
  declarations: [
    PagesComponent,
    AuthBlockComponent,
  ],
})
export class PagesModule {
}
