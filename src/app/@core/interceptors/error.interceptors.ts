import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Router} from '@angular/router';

import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {AuthService} from '../../pages/auth/auth.service';
import {SnackbarService} from '../services/snackbar.service';

import {LANGUAGE_CN as l} from '../modules/languiage/cn';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authSvc: AuthService, private snackbarSvc: SnackbarService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(tap(
      res => this.handleResponse(res, req, next),
      err => this.handleResponse(err, req, next)
    ));
  }

  private handleResponse(res: any, req, next): void {
    if (res.status && res.status !== 200) {
      if (res.status === 401) {
        this.authSvc.requestAuth();
      } else {
        this.snackbarSvc.show(l[res.error.message[0].messages[0].message]);
      }
    }
  }
}
