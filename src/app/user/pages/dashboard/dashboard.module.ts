import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  NbButtonModule,
  NbCardModule,
  NbInputModule,
  NbSelectModule,
  NbIconModule,
  NbDialogModule,
} from '@nebular/theme';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import rrulePlugin from '@fullcalendar/rrule';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { ThemeModule } from '../../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { CalendarComponent } from './calendar/calendar.component';
import { TaskComponent } from './task/task.component';
import { DialogTaskPromptComponent } from './task/dialog-task-prompt/dialog-task-prompt.component';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin,
  rrulePlugin,
]);

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    RouterModule,
    NbCardModule,
    NbInputModule,
    NbSelectModule,
    NbIconModule,
    NbButtonModule,
    NbDialogModule,
    FullCalendarModule,
    SweetAlert2Module.forRoot(),
  ],
  declarations: [
    DashboardComponent,
    CalendarComponent,
    TaskComponent,
    DialogTaskPromptComponent,
  ],
})

export class DashboardModule { }
