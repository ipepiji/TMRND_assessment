import { Component, OnInit, OnChanges, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import {
  NbDialogService,
  NbToastrService,
  NbGlobalPhysicalPosition,
} from '@nebular/theme';
import * as moment from 'moment';
import Swal from 'sweetalert2';

import { UserData } from '../../../../@core/data/user';
import { DialogTaskPromptComponent } from './dialog-task-prompt/dialog-task-prompt.component';
import { CommonService } from '../../../../@core/utils/common.service';

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
  form: FormGroup;
  subs: any;
  task: any;
  task_hours: any = 0;
  task_req_hours: any = 8;
  subtasks: Array<Object>;

  config: Object = {
    status: 'success',
    destroyByClick: true,
    hasIcon: true,
    duration: 1500,
    position: NbGlobalPhysicalPosition.TOP_RIGHT,
    preventDuplicates: false,
  };

  constructor(private service: UserData,
    private dialogService: NbDialogService,
    private commonService: CommonService,
    private fb: FormBuilder,
    private toastrService: NbToastrService,) {
    this.form = this.fb.group({
      date: new FormControl(''),
      req_hour: new FormControl(''),
      hour: new FormControl(''),
      description: new FormControl(''),
    });
  }

  ngOnInit(): void { }

  ngOnChanges() {
    if (this.date) {
      this.loadTask();
    }
  }

  ngOnDestroy() {
    if (this.subs)
      this.subs.unsubscribe();
  }

  loadTask() {
    this.task = null;
    this.task_hours = 0;
    this.task_req_hours = 8;
    this.subtasks = new Array;
    this.title = `${this.date.day}, ${moment(this.date.value).format('DD/MM/YYYY')}`;
    this.subs = this.service.getTask(this.date.value).subscribe({
      next: (res: any) => {
        this.task = res.data;
        this.task_hours = this.task.hour;
        this.task_req_hours = this.task.req_hour;
        this.subtasks = this.task.subtask;
        this.title += this.task_req_hours === 0 ? " (ONLEAVE)" : this.task_req_hours === 4 ? ` (HALFDAY) ${this.task_hours ? `(${this.task_hours} hours)` : ''}` : ` ${this.task_hours ? `(${this.task_hours} hours)` : ''}`;
      },
      error: (err: any) => {
        if (err.status !== 400)
          console.error("this.service.getTask()", err);
      }
    });
  }

  createSubtask() {
    this.dialogService.open(
      DialogTaskPromptComponent, {
      context: {
        title: `${this.date.day}, ${moment(this.date.value).format('DD/MM/YYYY')}`
      },
    }).onClose.subscribe(task => {
      if (task) {
        if (Number(this.task?.hour || 0) + Number(task.get('hour')) <= 24) {
          const formData = new FormData();
          formData.set('date', this.date.value);
          formData.set('req_hour', this.task_req_hours);
          formData.set('hour', task.get('hour'));
          formData.set('description', task.get('description'));
          this.subs = this.service.createSubtask(formData).subscribe({
            next: (res: any) => {
              this.toastrService.show(
                "New Task has been created!",
                "SUCCESS",
                this.config,
              );
              this.loadTask();
              this.commonService.notifyOther("update");
            },
            error: (err: any) => {
              console.error("this.service.createSubtask", err);
            }
          });
        }
        else {
          Swal.fire(
            'Exceed 24 hours!',
            'Please calculate hour for new task carefully',
            'error'
          );
        }
      }
    });
  }

  updateSubtask(id: number, hour: string, description: string) {
    const number = Number(hour) * 60;
    const calc_hours = Math.floor(number / 60);
    const calc_minutes = Math.floor(number % 60);
    this.dialogService.open(
      DialogTaskPromptComponent, {
      context: {
        title: `${this.date.day}, ${moment(this.date.value).format('DD/MM/YYYY')}`,
        hour: calc_hours,
        minute: calc_minutes,
        description,
      },
    }).onClose.subscribe(task => {
      if (task) {
        if (Number(this.task.hour) - Number(hour) + Number(task.get('hour')) <= 24) {
          const formData = new FormData();
          formData.set('hour', task.get('hour'));
          formData.set('description', task.get('description'));
          this.subs = this.service.updateSubtask(formData, id).subscribe({
            next: (res: any) => {
              this.toastrService.show(
                "Task has been updated!",
                "SUCCESS",
                this.config,
              );
              this.loadTask();
              this.commonService.notifyOther("update");
            },
            error: (err: any) => {
              console.error("this.service.createSubtask", err);
            }
          });
        }
        else {
          Swal.fire(
            'Exceed 24 hours!',
            'Please calculate hour for updated task carefully',
            'error'
          );
        }
      }
    });
  }

  deleteSubtask(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      preConfirm: () => {
        this.subs = this.service.deleteSubtask(id).subscribe({
          next: (res: any) => {
            return "Success";
          },
          error: (err: any) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            })
          }
        });
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Subtask has been deleted.',
          'success'
        );
        this.loadTask();
        this.commonService.notifyOther("update");
      }
    })
  }

  halfday() {
    Swal.fire({
      title: `Apply HALFDAY on ${moment(this.date.value).format('DD/MM/YYYY')}?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      preConfirm: () => {
        const formData = new FormData();
        formData.set('date', this.date.value);
        formData.set('req_hour', '4');
        this.subs = this.service.leave(formData).subscribe({
          next: (res: any) => {
            return "Success";
          },
          error: (err: any) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            })
          }
        });
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Applied',
          `Halfday on ${moment(this.date.value).format('DD/MM/YYYY')}`,
          'success'
        );
        this.loadTask();
        this.commonService.notifyOther("update");
      }
    })
  }

  onleave() {
    Swal.fire({
      title: `Apply ONLEAVE on ${moment(this.date.value).format('DD/MM/YYYY')}?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      preConfirm: () => {
        const formData = new FormData();
        formData.set('date', this.date.value);
        formData.set('req_hour', '0');
        this.subs = this.service.leave(formData).subscribe({
          next: (res: any) => {
            return "Success";
          },
          error: (err: any) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            })
          }
        });
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Applied',
          `Onleave on ${moment(this.date.value).format('DD/MM/YYYY')}`,
          'success'
        );
        this.loadTask();
        this.commonService.notifyOther("update");
      }
    })
  }

}
