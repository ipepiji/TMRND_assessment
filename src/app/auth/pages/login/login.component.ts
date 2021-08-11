import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import {
  NbToastrService,
  NbGlobalPhysicalPosition,
} from '@nebular/theme';
import { Router } from '@angular/router';

import { AuthData } from '../../../@core/data/auth';

@Component({
  selector: 'nb-auth-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnDestroy {
  loading = false;
  submitted = false;
  form: FormGroup;
  subs: any;

  config: Object = {
    status: 'success',
    destroyByClick: true,
    hasIcon: true,
    duration: 3000,
    position: NbGlobalPhysicalPosition.TOP_RIGHT,
    preventDuplicates: true,
  };

  constructor(protected service: AuthData,
    private fb: FormBuilder,
    protected cd: ChangeDetectorRef,
    protected router: Router,
    private toastrService: NbToastrService,) {
    this.form = this.fb.group({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }

  ngOnDestroy() {
    if (this.subs)
      this.subs.unsubscribe();
  }

  login(): void {
    this.submitted = this.loading = true;
    const formData = new FormData();
    formData.set('username', this.form.get('username').value);
    formData.set('password', this.form.get('password').value);
    this.subs = this.service.login(formData).subscribe({
      next: (res: any) => {
        this.submitted = this.loading = false;
        const redirect = "user";
        const message = `Authenticated! Welcome ${this.form.get('username').value}`;
        this.toastrService.show(
          message,
          "SUCCESS",
          this.config,
        );
        localStorage.setItem("token", res.token);
        setTimeout(() => this.router.navigateByUrl(redirect), 1000);
      },
      error: (err: any) => {
        this.submitted = this.loading = false;
        this.toastrService.show(
          err.error.message,
          "ERROR",
          {
            ...this.config,
            status: "danger",
          }
        );
        this.form.patchValue({
          password: '',
        });
        this.cd.detectChanges();
      }
    });
  }
}
