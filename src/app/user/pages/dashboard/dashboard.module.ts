import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
} from '@nebular/theme';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import rrulePlugin from '@fullcalendar/rrule';

import { ThemeModule } from '../../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { CalendarComponent } from './calendar/calendar.component';
import { TaskComponent } from './task/task.component';
import { FormsModule } from '@angular/forms';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin,
  rrulePlugin,
]);

@NgModule({
  imports: [
    FormsModule,
    ThemeModule,
    NbCardModule,
    NbIconModule,
    NbButtonModule,
    RouterModule,
    FullCalendarModule,
  ],
  declarations: [
    DashboardComponent,
    CalendarComponent,
    TaskComponent,
  ],
})

export class DashboardModule { }
