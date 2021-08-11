import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ContentTypeService {

  constructor(@Inject('PREFIX_URL') private PREFIX_URL, private http: HttpClient) {
  }

  items(): Observable<any> {
    return this.http.get(this.PREFIX_URL + '/content-types');
  }

  item(id): Observable<any> {
    return this.http.get(this.PREFIX_URL + '/content-types/' + id);
  }

  find(body): Observable<any> {
    return this.http.get(this.PREFIX_URL + '/content-types', {params: body});
  }

  count(): Observable<any> {
    return this.http.get(this.PREFIX_URL + '/content-types/count');
  }

  create(body): Observable<any> {
    return this.http.post(this.PREFIX_URL + '/content-types', {params: body});
  }

  update(id, body): Observable<any> {
    return this.http.put(this.PREFIX_URL + '/content-types/' + id, body);
  }

  delete(id): Observable<any> {
    return this.http.delete(this.PREFIX_URL + '/content-types/' + id);
  }


}
