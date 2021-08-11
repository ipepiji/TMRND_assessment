import { Component } from '@angular/core';
import * as moment from 'moment';

export interface SelectedDate {
  value: string;
  day: string
}

@Component({
  selector: 'ngx-user-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {

  selectedDate: SelectedDate = {
    value: moment().format('DD/MM/YYYY'),
    day: moment().format('dddd')
  };;

  constructor() { }

  onDateChange(date: SelectedDate): void {
    this.selectedDate = date;
  }
}
