import {Component, HostBinding, Injector} from '@angular/core';
import {AppItemBaseComponent} from '../../../../@shared/components/base/base.component';

@Component({
  selector: 'app-admin-menu-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss']
})
export class AdminMenuItemPage extends AppItemBaseComponent {
  @HostBinding('class') classes = 'ion-page';
  orderKeys = [
    'name_' + this.lan,
    'menu',
    'tags',
    'channel',
    'content_type',
    'template',
    'custom_type',
    'order',
    'description_' + this.lan,
    'thumb',
    'poster_' + this.lan,
    'show',
    'content_' + this.lan
  ];
  parent = this.route.snapshot.queryParams.parent;

  constructor(injector: Injector) {
    super(injector);
    this.init('menu', this.orderKeys);
    if (parent) {
      this.form.get('menu').setValue(Number(this.parent));
    }
  }

  save(): any {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return false;
    }
    this.submit(this.menuSvc);
  }
}
