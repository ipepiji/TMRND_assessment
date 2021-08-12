import { Component } from '@angular/core';
import * as moment from 'moment';

interface SelectedDate {
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
    value: moment().format('YYYY-MM-DD'),
    day: moment().format('dddd')
  };;

  constructor() { }

  onDateChange(date: SelectedDate): void {
    this.selectedDate = date;
  }
}
