import {Component, HostBinding, Injector} from '@angular/core';
import {AppItemBaseComponent} from '../../../../@shared/components/base/base.component';
import {UploadService} from '../../../../@shared/components/uploader/upload.service';
import {ArticleService} from '../../article/article.service';

@Component({
  selector: 'app-admin-file-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss']
})
export class AdminFileItemPage extends AppItemBaseComponent {
  @HostBinding('class') classes = 'ion-page';
  orderKeys = [
    'title_' + this.lan,
    'menu',
    'description_' + this.lan,
    'file',
    'custom_type',
    'body_' + this.lan
  ];
  menu = this.route.snapshot.queryParams.menu;

  constructor(injector: Injector,
              private uploadSvc: UploadService,
              private articleSvc: ArticleService) {
    super(injector);
    this.init('article', this.orderKeys);
    this.form.get('menu').setValue(Number(this.menu));
  }

  save(): any {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return false;
    }
    this.submit(this.articleSvc);
  }
}
