import { Component, OnInit, OnChanges, Input } from '@angular/core';

export interface SelectedDate {
  value: string;
  day: string
}

@Component({
  selector: 'ngx-user-dashboard-task',
  styleUrls: ['./task.component.scss'],
  templateUrl: './task.component.html',
})
export class TaskComponent implements OnInit, OnChanges {

  @Input() date: SelectedDate;
  title: string;

  constructor() { }

  ngOnInit() { }

  ngOnChanges() {
    if (this.date)
      this.title = `${this.date.day}, ${this.date.value}`;
  }

  ngOnDestroy() {}
}
