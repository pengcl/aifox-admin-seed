import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';

import {StorageService} from '../../@core/services/storage.service';

@Injectable({providedIn: 'root'})
export class AuthService {
  public loginRedirectUrl: string;
  private loginStatus = new Subject<boolean>();

  constructor(@Inject('PREFIX_URL') private PREFIX_URL,
              private http: HttpClient,
              private router: Router,
              private storage: StorageService) {
  }

  requestAuth(): any {
    if (this.router.url.indexOf('auth') !== -1) {
      return false;
    }
    if (this.loginRedirectUrl) {
      return false;
    }

    this.loginRedirectUrl = this.router.url;
    this.router.navigate(['/auth']).then();
  }

  login(body): Observable<any> {
    return this.http.post(this.PREFIX_URL + '/auth/local', body);
  }

  users(): Observable<any> {
    return this.http.get('api/users');
  }

  token(token?): any {
    if (token) {
      this.storage.set('token', JSON.stringify(token));
    } else if (token === null) {
      this.storage.remove('token');
    } else {
      const TOKEN = this.storage.get('token');
      if (TOKEN) {
        return JSON.parse(TOKEN);
      } else {
        return '';
      }
    }
  }

  get currentUser(): any {
    const token = this.storage.get('token');
    return JSON.parse(token).user;
  }

  get isLogged(): boolean {
    this.loginStatus.next(!!this.currentUser);
    return !!this.currentUser;
  }

  getLoginStatus(): Observable<boolean> {
    return this.loginStatus.asObservable();
  }

  updateLoginStatus(token): void {
    this.storage.set('token', JSON.stringify(token));
    this.loginStatus.next(this.isLogged);
  }

  logout(): void {
    this.storage.remove('token');
    this.router.navigate(['/auth']).then();
  }
}
