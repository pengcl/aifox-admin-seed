import {Component, HostBinding, Injector} from '@angular/core';
import {AppItemBaseComponent} from '../../../../@shared/components/base/base.component';
import {UploadService} from '../../../../@shared/components/uploader/upload.service';
import {ArticleService} from '../article.service';
import {FileService} from '../../../../@shared/modules/file/file.service';

@Component({
  selector: 'app-admin-article-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss']
})
export class AdminArticleItemPage extends AppItemBaseComponent {
  @HostBinding('class') classes = 'ion-page';
  orderKeys = [
    'title_' + this.lan,
    'short_title_' + this.lan,
    'menu',
    'description_' + this.lan,
    'thumb',
    'custom_type',
    'body_' + this.lan
  ];
  menu = this.route.snapshot.queryParams.menu;

  constructor(injector: Injector,
              private uploadSvc: UploadService,
              private articleSvc: ArticleService,
              private fileSvc: FileService) {
    super(injector);
    this.init('article', this.orderKeys);
    this.form.get('menu').setValue(Number(this.menu));
  }

  save(): any {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return false;
    }
    this.submit(this.articleSvc, (res) => {
      this.form.reset();
      this.init('article', this.orderKeys);
      this.form.get('menu').setValue(Number(this.menu));
    });
  }
}
