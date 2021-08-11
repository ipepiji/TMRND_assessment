import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { FullCalendarComponent, CalendarOptions, EventApi } from '@fullcalendar/angular';
import * as moment from 'moment';

import { UserData } from '../../../../@core/data/user';

export interface SelectedDate {
  value: string;
  day: string
}

@Component({
  selector: 'ngx-user-dashboard-calendar',
  templateUrl: 'calendar.component.html',
  styleUrls: ['calendar.component.scss'],
})
export class CalendarComponent implements OnInit, OnDestroy {

  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  @Output() dateEvent = new EventEmitter<SelectedDate>();

  subs: any;
  eventSources: Array<Object> = [];
  currentEvents: EventApi[] = [];
  calendarOptions: CalendarOptions;

  constructor(private service: UserData) { }

  ngOnInit(): void {
    this.loadEvents();
  }

  ngOnDestroy() {
    if (this.subs)
      this.subs.unsubscribe();
  }

  loadEvents(): void {
    this.subs = this.service.getTasks().subscribe({
      next: (res: any) => {
        this.eventSources = res.data.map(evt => {
          return { id: evt.id, date: moment(evt.date).format('YYYY-MM-DD'), title: evt.status, db: "yes" }
        });
        this.eventSources.push({
          color: 'yellow',
          borderColor: 'sea blue',
          overLap: false,
          allDay: true,
          rrule: {
            freq: 'monthly',
            byweekday: [5, 6],
            dtstart: new Date(null),
            until: moment().format('YYYY-MM-DD'),
          },
        },
          {
            title: "PENDING",
            overLap: false,
            allDay: true,
            rrule: {
              freq: 'monthly',
              byweekday: [0, 1, 2, 3, 4],
              dtstart: new Date(null),
              until: moment().format('YYYY-MM-DD'),
            },
          });

        this.calendarOptions = {
          height: '100%',
          initialView: 'dayGridMonth',
          weekends: true,
          selectable: false,
          editable: true,
          eventBackgroundColor: 'red',
          eventBorderColor: 'sea blue',
          customButtons: {
            newTodayButton: {
              text: 'today',
              click: this.handleNewTodayButton.bind(this)
            }
          },
          headerToolbar: {
            left: 'title',
            right: 'newTodayButton prev,next',
          },
          eventSources: [this.eventSources],
          eventContent: function (args, createElement) {
            if (args.event._def.title === "COMPLETE") {
              const icon = "&nbsp;<i class='fa fa-thumbs-up'></i>";
              return {
                html: icon,
              };
            }

            if (args.event._def.title === "PENDING") {
              const icon = "&nbsp;<i class='fa fa-thumbs-down'></i>";
              return {
                html: icon,
              };
            }
          },
          // eventDidMount: function (a) {
          // },
          eventClick: this.handleEventClick.bind(this),
          eventsSet: this.handleEvents.bind(this),
        };
      },
      error: (err: any) => {
        console.error("this.service.getTasks()", err);
      }
    });
  }

  handleEventClick(info): void {
    info.jsEvent.preventDefault();
    const selectedDate: SelectedDate = {
      value: moment(info.event._instance.range.start).format('DD/MM/YYYY'),
      day: moment(info.event._instance.range.start).format('dddd')
    };
    this.dateEvent.emit(selectedDate);
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

  handleNewTodayButton(event) {
    let calendarApi = this.calendarComponent.getApi();
    calendarApi.today();
    const selectedDate: SelectedDate = {
      value: moment().format('DD/MM/YYYY'),
      day: moment().format('dddd')
    };
    this.dateEvent.emit(selectedDate);
  }
}
