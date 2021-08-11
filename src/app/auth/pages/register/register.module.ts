import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  NbCardModule,
  NbInputModule,
  NbButtonModule,
  NbSpinnerModule,
} from '@nebular/theme';

import { ThemeModule } from '../../../@theme/theme.module';
import { RegisterComponent } from './register.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NbCardModule,
    ThemeModule,
    NbInputModule,
    NbButtonModule,
    NbSpinnerModule,
  ],
  declarations: [
    RegisterComponent,
  ],
})

export class RegisterModule { }
