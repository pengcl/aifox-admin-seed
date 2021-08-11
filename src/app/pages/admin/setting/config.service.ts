import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {StorageService} from '../../../@core/services/storage.service';

@Injectable({providedIn: 'root'})
export class ConfigService {
  private settingStatus = new Subject<any>();

  constructor(@Inject('PREFIX_URL') private PREFIX_URL, private http: HttpClient,
              private router: Router, private storageSvc: StorageService) {
  }

  get(): Observable<any> {
    return this.http.get(this.PREFIX_URL + '/config');
  }

  create(data): Observable<any> {
    return this.http.put(this.PREFIX_URL + '/config', data);
  }

  update(data): Observable<any> {
    return this.http.put(this.PREFIX_URL + '/config', data);
  }

  set(config): void {
    this.storageSvc.set('config', JSON.stringify(config));
    this.settingStatus.next(config);
  }

  get currentSettings(): any {
    const config = JSON.parse(this.storageSvc.get('config'));
    return config;
  }

  getSettingStatus(): Observable<boolean> {
    return this.settingStatus.asObservable();
  }
}
