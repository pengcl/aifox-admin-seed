import {Component, HostBinding, Injector} from '@angular/core';
import {AppItemBaseComponent} from '../../../@shared/components/base/base.component';

@Component({
  selector: 'app-admin-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss']
})
export class AdminSettingPage extends AppItemBaseComponent {
  @HostBinding('class') classes = 'ion-page';
  orderKeys = [
    'name_' + this.lan,
    'phone_' + this.lan,
    'mail_' + this.lan,
    'language',
    'icp',
    'banners_' + this.lan,
    'logo',
    'code_public',
    'code_mini',
    'code_download'
  ];

  constructor(injector: Injector) {
    super(injector);
    this.init('config', this.orderKeys);
  }

  save(): any {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return false;
    }
    this.submit(this.settingSvc);
  }

}
