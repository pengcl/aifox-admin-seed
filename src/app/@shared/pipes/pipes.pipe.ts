import {Injectable, Pipe, PipeTransform} from '@angular/core';
import {SettingService} from '../../pages/admin/setting/setting.service';
import {LanguageService} from '../../@core/modules/languiage/language.service';
import {LANGUAGE_CN} from '../../@core/modules/languiage/cn';
import {LANGUAGE_EN} from '../../@core/modules/languiage/en';
import {LANGUAGE_HK} from '../../@core/modules/languiage/hk';

const LANGUAGE = {
  cn: LANGUAGE_CN,
  en: LANGUAGE_EN,
  hk: LANGUAGE_HK
};

@Pipe({
  name: 'repairDate',
  pure: false
})

@Injectable()
export class RepairDatePipe implements PipeTransform {
  transform(value): any {
    value = value.split('.')[0].replace(/\-/g, '/');
    return value;
  }
}

@Pipe({
  name: 'detail',
  pure: false
})
@Injectable()
export class DetailPipe implements PipeTransform {
  transform(html): any {
    if (!html) {
      return html;
    }
    return html.replace(/img src="/g, 'img src="/api');
  }
}

@Pipe({
  name: 'html',
  pure: false
})
@Injectable()
export class HtmlPipe implements PipeTransform {
  transform(value): any {
    if (!value) {
      return value;
    }
    return value.replace(/\n/g, '<br/>');
  }
}

@Pipe({
  name: 'lan',
  pure: false
})
@Injectable()
export class LanPipe implements PipeTransform {
  languages = this.languageSvc.languages;
  lan = this.settingSvc.currentSettings.language.code;

  constructor(private settingSvc: SettingService, private languageSvc: LanguageService) {
  }

  transform(data, key): any {
    if (!data) {
      return data;
    }
    let value = data[key + '_' + this.lan];
    if (!value) {
      value = LANGUAGE[this.lan].missing + ' ' + LANGUAGE[this.lan][key];
    }
    return value;
  }
}

@Pipe({
  name: 'customType',
  pure: false
})
@Injectable()
export class CustomTypePipe implements PipeTransform {

  transform(customTypes, menu): any {
    if (!customTypes || !menu) {
      return customTypes;
    }
    if (customTypes && menu) {
      return customTypes.filter(item => {
        return item.menu.id === menu;
      });
    }
  }
}

@Pipe({
  name: 'fileType',
  pure: false
})
@Injectable()
export class FileTypePipe implements PipeTransform {

  transform(mime): any {
    if (!mime) {
      return mime;
    }
    return mime.split('/')[0];
  }
}
