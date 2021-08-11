import {Component, HostBinding, Injector} from '@angular/core';
import {AppItemBaseComponent} from '../../../../@shared/components/base/base.component';
import {UploadService} from '../../../../@shared/components/uploader/upload.service';
import {UserService} from '../user.service';

@Component({
  selector: 'app-admin-user-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss']
})
export class AdminUserItemPage extends AppItemBaseComponent {
  @HostBinding('class') classes = 'ion-page';
  orderKeys = [
    'username',
    'email',
    'password',
    'role',
    'confirmed'
  ];

  constructor(injector: Injector,
              private uploadSvc: UploadService,
              private userSvc: UserService) {
    super(injector);
    this.init('user', this.orderKeys);
    this.form.get('role').setValue(1);
  }

  save(): any {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return false;
    }
    this.submit(this.userSvc, (res) => {
      this.form.reset();
      this.init('user', this.orderKeys);
    });
  }
}
