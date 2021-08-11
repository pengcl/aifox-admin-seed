import {Component, Inject} from '@angular/core';
import {LocationStrategy} from '@angular/common';
import {PopoverController} from '@ionic/angular';
import {AuthService} from '../../../pages/auth/auth.service';
import {SettingService} from '../../../pages/admin/setting/setting.service';
import {NotifyComponent} from '../notify/notify.component';
import {FormGroup, FormControl, Validators} from '@angular/forms';

import {LanguageService} from '../../../@core/modules/languiage/language.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  user = this.authSvc.currentUser;
  settings = this.settingSvc.currentSettings;
  form: FormGroup = new FormGroup({
    language: new FormControl('', [Validators.required])
  });
  languages;
  lan = this.settings.language.code;

  constructor(@Inject('PREFIX_URL') public PREFIX_URL,
              private location: LocationStrategy, private popoverController: PopoverController,
              private languageSvc: LanguageService,
              private settingSvc: SettingService,
              private authSvc: AuthService) {
    this.languageSvc.items().subscribe(res => {
      this.languages = res;
    });
    if (this.settings) {
      console.log(this.settings);
      this.form.get('language').setValue(this.settings.language.id);
    }
  }

  translate(key: string, ...args: any[]): string {
    return this.languageSvc.translate(key);
  }

  async presentPopover(e: any): Promise<any> {
    const popover = await this.popoverController.create({
      component: NotifyComponent,
      event: e,
      translucent: true
    });
    return await popover.present();
  }

  languageChange(language): void {
    this.languages.forEach(item => {
      if (item.id === language) {
        this.settings.language = item;
        this.settingSvc.set(this.settings);
      }
      window.location.reload();
    });
  }

  logout(): void {
    this.authSvc.logout();
  }
}
