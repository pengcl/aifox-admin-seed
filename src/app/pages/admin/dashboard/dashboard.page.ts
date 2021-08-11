import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {SettingService} from '../setting/setting.service';
import {AuthService} from '../../auth/auth.service';
import {UploadService} from '../../../@shared/components/uploader/upload.service';
import {MenuService} from '../menu/menu.service';
import {ArticleService} from '../article/article.service';
import {LanguageService} from '../../../@core/modules/languiage/language.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class AdminDashboardPage {
  user;
  count = {
    menu: 0,
    article: 0,
    upload: 0
  };
  items = {
    menu: [],
    article: [],
    upload: []
  };
  setting = this.settingSvc.currentSettings;
  lan = this.setting.language.code;

  constructor(private router: Router,
              private settingSvc: SettingService,
              private authSvc: AuthService,
              private menuSvc: MenuService,
              private articleSvc: ArticleService,
              private uploadSvc: UploadService,
              private languageSvc: LanguageService) {
    this.user = authSvc.currentUser;
    menuSvc.count().subscribe(res => {
      this.count.menu = res;
    });
    articleSvc.count().subscribe(res => {
      this.count.article = res;
    });
    uploadSvc.count().subscribe(res => {
      this.count.upload = res;
    });
    menuSvc.items().subscribe(res => {
      this.items.menu = res.filter(item => !item.menu);
    });
    articleSvc.items().subscribe(res => {
      this.items.article = res;
    });
  }

  translate(key): string {
    return this.languageSvc.translate(key);
  }

}
