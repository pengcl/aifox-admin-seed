import {Component} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {LanguageService} from '../../@core/modules/languiage/language.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss']
})
export class AdminPage {
  user = this.authSvc.currentUser;

  constructor(private authSvc: AuthService, private languageSvc: LanguageService) {
  }

  translate(key: string, ...args: any[]): string {
    return this.languageSvc.translate(key);
  }

}
