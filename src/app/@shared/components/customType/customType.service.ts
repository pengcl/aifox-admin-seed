import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class CustomTypeService {

  constructor(@Inject('PREFIX_URL') private PREFIX_URL, private http: HttpClient) {
  }

  items(): Observable<any> {
    return this.http.get(this.PREFIX_URL + '/custom-types');
  }

  item(id): Observable<any> {
    return this.http.get(this.PREFIX_URL + '/custom-types/' + id);
  }

  find(body): Observable<any> {
    return this.http.get(this.PREFIX_URL + '/custom-types', {params: body});
  }

  count(): Observable<any> {
    return this.http.get(this.PREFIX_URL + '/custom-types/count');
  }

  create(body): Observable<any> {
    return this.http.post(this.PREFIX_URL + '/custom-types', body);
  }

  update(id, body): Observable<any> {
    return this.http.put(this.PREFIX_URL + '/custom-types/' + id, body);
  }

  delete(id): Observable<any> {
    return this.http.delete(this.PREFIX_URL + '/custom-types/' + id);
  }
}
