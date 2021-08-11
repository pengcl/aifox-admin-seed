import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {mergeMap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class RoleService {

  constructor(@Inject('PREFIX_URL') private PREFIX_URL, private http: HttpClient) {
  }

  items(): Observable<any> {
    return this.http.get(this.PREFIX_URL + '/users-permissions/roles').pipe(mergeMap((res: any) => {
      console.log(res.roles);
      return of(res.roles);
    }));
  }

  item(id): Observable<any> {
    return this.http.get(this.PREFIX_URL + '/users-permissions/roles/' + id);
  }

  find(body): Observable<any> {
    return this.http.get(this.PREFIX_URL + '/users-permissions/roles', {params: body});
  }

  create(body): Observable<any> {
    return this.http.post(this.PREFIX_URL + '/users-permissions/roles', body);
  }

  update(role, body): Observable<any> {
    return this.http.put(this.PREFIX_URL + '/users-permissions/roles/' + role, body);
  }

  delete(role): Observable<any> {
    return this.http.delete(this.PREFIX_URL + '/users-permissions/roles/' + role);
  }

}
