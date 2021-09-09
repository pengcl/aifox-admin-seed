import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class UploadService {
  private settingStatus = new Subject<boolean>();

  constructor(@Inject('PREFIX_URL') private PREFIX_URL, private http: HttpClient) {
  }

  items(): Observable<any> {
    return this.http.get(this.PREFIX_URL + '/upload/files');
  }

  item(id): Observable<any> {
    return this.http.get(this.PREFIX_URL + '/upload/files/' + id);
  }

  find(id): Observable<any> {
    return this.http.get(this.PREFIX_URL + '/upload/search/' + id);
  }

  count(): Observable<any> {
    return this.http.get(this.PREFIX_URL + '/upload/files/count');
  }

  upload(body): Observable<any> {
    return this.http.post(this.PREFIX_URL + '/upload', body);
  }

  delete(id): Observable<any> {
    return this.http.delete(this.PREFIX_URL + '/upload/files/' + id);
  }
}
