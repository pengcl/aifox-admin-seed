import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class AssetService {

  constructor(@Inject('PREFIX_URL') private PREFIX_URL, private http: HttpClient) {
  }

  items(): Observable<any> {
    return this.http.get(this.PREFIX_URL + '/assets');
  }

  item(id): Observable<any> {
    return this.http.get(this.PREFIX_URL + '/assets/' + id);
  }

  find(body): Observable<any> {
    return this.http.get(this.PREFIX_URL + '/assets', {params: body});
  }

  count(): Observable<any> {
    return this.http.get(this.PREFIX_URL + '/assets/count');
  }

  create(body): Observable<any> {
    return this.http.post(this.PREFIX_URL + '/assets', {params: body});
  }

  update(id, body): Observable<any> {
    return this.http.put(this.PREFIX_URL + '/assets/' + id, {params: body});
  }

  delete(id): Observable<any> {
    return this.http.delete(this.PREFIX_URL + '/assets/' + id);
  }

}
