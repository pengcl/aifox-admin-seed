import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {mergeMap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class UserService {

  constructor(@Inject('PREFIX_URL') private PREFIX_URL, private http: HttpClient) {
  }

  get(): Observable<any> {
    return this.http.get(this.PREFIX_URL + '/users/me');
  }

  items(): Observable<any> {
    return this.http.get(this.PREFIX_URL + '/users');
  }

  item(id): Observable<any> {
    return this.http.get(this.PREFIX_URL + '/users/' + id);
  }

  find(body): Observable<any> {
    return this.http.get(this.PREFIX_URL + '/users', {params: body});
  }

  count(): Observable<any> {
    return this.http.get(this.PREFIX_URL + '/users/count');
  }

  create(body): Observable<any> {
    return this.http.post(this.PREFIX_URL + '/users', body);
  }

  update(id, body): Observable<any> {
    return this.http.put(this.PREFIX_URL + '/users/' + id, body);
  }

  delete(id): Observable<any> {
    return this.http.delete(this.PREFIX_URL + '/users/' + id);
  }

}
