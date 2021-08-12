import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { FullCalendarComponent, CalendarOptions, EventApi } from '@fullcalendar/angular';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as moment from 'moment';

import { UserData } from '../../../../@core/data/user';
import { CommonService } from '../../../../@core/utils/common.service';

interface SelectedDate {
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
  eventSources: Array<Object> = new Array;
  currentEvents: EventApi[] = new Array;
  calendarOptions: CalendarOptions = {
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
    eventContent: function (args, createElement) {
      if (args.event._def.title === "COMPLETE") {
        const icon = "&nbsp;<i class='fa fa-thumbs-up'></i>";
        return {
          html: icon
        };
      }

      if (args.event._def.title === "PENDING") {
        const icon = "&nbsp;<i class='fa fa-thumbs-down'></i>";
        return {
          html: icon,
        };
      }
    },
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
  };

  constructor(private userService: UserData,
    private commonService: CommonService) { }

  ngOnInit(): void {
    this.loadEvents();
    this.subs = this.commonService.notifyObservable$.subscribe((res) => {
      if (res === "update")
        this.updateEvent();
    })
  }

  ngOnDestroy() {
    if (this.subs)
      this.subs.unsubscribe();
  }

  loadEvents(): void {
    this.eventSources = new Array;
    this.subs = this.userService.getTasks().pipe(
      switchMap((res: any) => {
        res.data.forEach(evt => {
          this.eventSources.push({
            id: evt.id,
            date: moment(evt.date).format('YYYY-MM-DD'),
            title: evt.status,
            backgroundColor: evt.status === "COMPLETE" ? '#0095ff' : evt.status === "ONLEAVE" ? 'green' : 'red'
          });
        });
        const exclude_date = res.data.map((evt) => {
          return moment(evt.date).format('YYYY-MM-DD');
        })
        return of(exclude_date);
      })
    ).subscribe({
      next: (exclude_date: string) => {
        this.eventSources.push({
          color: 'yellow',
          borderColor: 'sea blue',
          overLap: false,
          allDay: true,
          exdate: exclude_date,
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
            exdate: exclude_date,
            rrule: {
              freq: 'monthly',
              byweekday: [0, 1, 2, 3, 4],
              dtstart: new Date(null),
              until: moment().format('YYYY-MM-DD'),
            },
          });

        this.calendarOptions.eventSources = [this.eventSources];
      },
      error: (err: any) => {
        console.error("this.service.getTasks()", err);
      }
    });
  }

  handleEventClick(info): void {
    info.jsEvent.preventDefault();
    const selectedDate: SelectedDate = {
      value: moment(info.event._instance.range.start).format('YYYY-MM-DD'),
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
      value: moment().format('YYYY-MM-DD'),
      day: moment().format('dddd')
    };
    this.dateEvent.emit(selectedDate);
  }

  updateEvent() {
    this.loadEvents();
    let calendarApi = this.calendarComponent.getApi();
    calendarApi.render()
  }
}
