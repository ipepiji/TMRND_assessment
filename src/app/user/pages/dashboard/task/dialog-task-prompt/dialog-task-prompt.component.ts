import { Component, Input, OnChanges, AfterContentInit, } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-dialog-task-prompt',
  templateUrl: 'dialog-task-prompt.component.html',
  styleUrls: ['dialog-task-prompt.component.scss'],
})
export class DialogTaskPromptComponent implements AfterContentInit {

  @Input() title: string;
  @Input() hour: any;
  @Input() minute: any;
  @Input() description: string;

  form: FormGroup;
  hours: Array<number> = [];
  minutes: Array<number> = [];
  submitted = false;
  type: string = "add";

  constructor(protected ref: NbDialogRef<DialogTaskPromptComponent>,
    private fb: FormBuilder,) {
    this.form = this.fb.group({
      hour: new FormControl(''),
      minute: new FormControl(''),
      description: new FormControl(''),
    });

    for (var i = 1; i <= 24; i++) {
      this.hours.push(i);
    }
    for (var i = 1; i <= 60; i++) {
      this.minutes.push(i);
    }
  }

  ngAfterContentInit() {
    this.form.patchValue({
      hour: this.hour,
      minute: this.minute,
      description: this.description,
    });
    this.type = "update";
  }

  submit() {
    this.submitted = true;
    let hour = Number(this.form.get('hour').value) || 0,
      minute = Number(this.form.get('minute').value) || 0,
      description = this.form.get('description').value;

    if (minute)
      hour += minute / 60;

    const formData = new FormData();
    formData.set('hour', hour.toFixed(3));
    formData.set('description', description);
    this.ref.close(formData);
  }
}
