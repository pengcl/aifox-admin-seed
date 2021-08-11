import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {StorageService} from '../../@core/services/storage.service';
import {AuthService} from './auth.service';
import {DocService} from '../../@core/modules/apiDocumentaion/doc.service';
import {SettingService} from '../admin/setting/setting.service';
import {LanguageService} from '../../@core/modules/languiage/language.service';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss']
})
export class AuthPage {
  form: FormGroup;

  constructor(private router: Router,
              private storageSvc: StorageService,
              private docSvc: DocService,
              private settingSvc: SettingService,
              private languageSvc: LanguageService,
              private authSvc: AuthService) {
    this.form = new FormGroup({
      identifier: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(16)]),
      password: new FormControl('', [Validators.required])
    });
  }

  login(): any {
    if (this.form.invalid) {
      return false;
    }
    this.authSvc.login(this.form.value).subscribe(res => {
      // 设置用户Token信息
      this.authSvc.updateLoginStatus(res);
      forkJoin([this.settingSvc.get(), this.docSvc.items(), this.languageSvc.items()]).subscribe(([config, contentType, languages]) => {
        this.settingSvc.set(config);
        const contentTypes = {};
        contentType.data.forEach(item => {
          contentTypes[item.apiID] = item.attributes;
        });
        this.docSvc.set(contentTypes);
        this.languageSvc.set(languages);
        this.router.navigate(['/admin/menu/list']).then();
      });
    });

  }

}
