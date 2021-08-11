import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      Created with ♥ by <b>Hafizhi</b> 2021
    </span>
    <div class="socials">
      <a href="https://github.com/ipepiji" target="_blank" class="ion ion-social-github"></a>
      <a href="https://www.facebook.com/pijifalah95" target="_blank" class="ion ion-social-facebook"></a>
      <a href="https://twitter.com/Hafizhi95" target="_blank" class="ion ion-social-twitter"></a>
      <a href="https://www.linkedin.com/in/mohd-irfan-hafizhi-zulkifli" target="_blank" class="ion ion-social-linkedin"></a>
    </div>
  `,
})
export class FooterComponent {
}
