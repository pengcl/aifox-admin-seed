import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StorageService} from '../../services/storage.service';
import {SettingService} from '../../../pages/admin/setting/setting.service';

import {LANGUAGE_CN} from './cn';
import {LANGUAGE_EN} from './en';
import {LANGUAGE_HK} from './hk';

@Injectable({providedIn: 'root'})
export class LanguageService {
  cn = LANGUAGE_CN;
  en = LANGUAGE_EN;
  hk = LANGUAGE_HK;

  constructor(@Inject('PREFIX_URL') private PREFIX_URL, private http: HttpClient,
              private storageSvc: StorageService,
              private settingSvc: SettingService) {
  }

  items(): Observable<any> {
    return this.http.get(this.PREFIX_URL + '/languages');
  }

  item(id): Observable<any> {
    return this.http.get(this.PREFIX_URL + '/languages/' + id);
  }

  find(body): Observable<any> {
    return this.http.get(this.PREFIX_URL + '/languages', {params: body});
  }

  count(): Observable<any> {
    return this.http.get(this.PREFIX_URL + '/languages/count');
  }

  create(body): Observable<any> {
    return this.http.post(this.PREFIX_URL + '/languages', {params: body});
  }

  update(id, body): Observable<any> {
    return this.http.put(this.PREFIX_URL + '/languages/' + id, body);
  }

  delete(id): Observable<any> {
    return this.http.delete(this.PREFIX_URL + '/languages/' + id);
  }

  get currentLanguage(): any {
    const lan = this.settingSvc.currentSettings.language.code;
    return this[lan];
  }

  get languages(): any {
    const languages = this.storageSvc.get('languages');
    return JSON.parse(languages);
  }

  set(languages): void {
    this.storageSvc.set('languages', JSON.stringify(languages));
  }

  translate(key): string {
    const lan = this.settingSvc.currentSettings.language.code;
    const suffix = '_' + lan;
    const LANGUAGE = this.currentLanguage;
    if (key.endsWith(suffix)) {
      key = key.replace(suffix, '');
    }
    return LANGUAGE[key] ? LANGUAGE[key] : key;
  }
}
