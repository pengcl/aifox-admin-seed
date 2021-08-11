import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {StorageService} from '../../services/storage.service';
import {SettingService} from '../../../pages/admin/setting/setting.service';
import {LanguageService} from '../languiage/language.service';

const ABANDON_KEYS = ['created_at', 'published_at', 'updated_at']; // 过滤无关字段
export const ABANDON_KEY_PREFIX_LIST = ['name', 'title', 'phone', 'content', 'description', 'body']; // 过滤语言字段
const abandonKeys = (contentType) => {
  const dto: any = {};
  for (const key in contentType) {
    if (ABANDON_KEYS.indexOf(key) === -1) {// 过滤无关字段
      dto[key] = contentType[key];
    }
  }
  return dto;
};

const abandonLanguages = (contentType, codes, currentCode?) => {
  const dto = {};
  const filterKeys = ABANDON_KEY_PREFIX_LIST;
  ABANDON_KEY_PREFIX_LIST.forEach(keyPrefix => {
    codes.forEach(code => {
      filterKeys.push(keyPrefix + '_' + code);
    });
  });
  for (const key in contentType) {
    if (filterKeys.indexOf(key) === -1) {
      dto[key] = contentType[key];
      if (key === 'name' + '_' + currentCode || key === 'title' + '_' + currentCode) {
        dto[key].required = true;
      }
    }
  }
  return dto;
};

@Injectable({providedIn: 'root'})
export class DocService {

  constructor(@Inject('PREFIX_URL') private PREFIX_URL,
              private http: HttpClient,
              private storageSvc: StorageService,
              private settingSvc: SettingService,
              private languageSvc: LanguageService) {
  }

  items(): Observable<any> {
    return this.http.get(this.PREFIX_URL + '/content-manager/content-types');
  }

  inputDto(apiID: 'article' | 'menu' | 'setting' | 'custom-type'): any {
    const code = this.settingSvc.currentSettings.language.code;
    const contentTypes = JSON.parse(JSON.stringify(this.contentTypes));
    const filterLanguageCodes = (() => {
      const filterCodes = [];
      const languages = this.languageSvc.languages.filter((language) => {
        return language.code !== code;
      });
      languages.forEach(item => {
        filterCodes.push(item.code);
      });
      return filterCodes;
    })();
    let contentType = contentTypes[apiID];
    contentType = abandonKeys(contentType);
    const dto = abandonLanguages(contentType, filterLanguageCodes, code);
    return dto;
  }

  outDto(apiID: 'article' | 'menu' | 'setting'): any {
    const dto = this.contentTypes[apiID];
    return dto;
  }

  get contentTypes(): any {
    const contentTypes = JSON.parse(this.storageSvc.get('contentTypes'));
    return contentTypes;
  }

  set(contentTypes): void {
    this.storageSvc.set('contentTypes', JSON.stringify(contentTypes));
  }
}
