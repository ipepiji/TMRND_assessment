import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  NbInputModule,
  NbButtonModule,
  NbSpinnerModule,
} from '@nebular/theme';

import { ThemeModule } from '../../../@theme/theme.module';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ThemeModule,
    NbInputModule,
    NbButtonModule,
    NbSpinnerModule,
  ],
  declarations: [
    LoginComponent,
  ],
})

export class LoginModule { }
