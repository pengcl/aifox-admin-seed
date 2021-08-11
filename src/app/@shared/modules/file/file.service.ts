import {DOCUMENT} from '@angular/common';
import {ApplicationRef, ComponentFactoryResolver, Inject, Injectable, Injector} from '@angular/core';

import {BaseService} from '../../../@core/services/base.service';
import {Observable} from 'rxjs';
import {FileComponent} from './file.component';
import {FileConfig} from './file.config';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class FileService extends BaseService {
  constructor(
    resolver: ComponentFactoryResolver,
    applicationRef: ApplicationRef,
    injector: Injector,
    @Inject(DOCUMENT) doc: any,
    @Inject('PREFIX_URL') private PREFIX_URL, private http: HttpClient) {
    super(resolver, applicationRef, injector, doc);
  }

  items(params): Observable<any> {
    console.log(params);
    return this.http.get(this.PREFIX_URL + '/upload/files', {params});
  }

  item(id): Observable<any> {
    return this.http.get(this.PREFIX_URL + '/upload/files/' + id);
  }

  find(body): Observable<any> {
    return this.http.get(this.PREFIX_URL + '/upload/files', {params: body});
  }

  count(): Observable<any> {
    return this.http.get(this.PREFIX_URL + '/upload/files/count');
  }

  create(body): Observable<any> {
    return this.http.post(this.PREFIX_URL + '/articles', body);
  }

  update(id, body): Observable<any> {
    return this.http.put(this.PREFIX_URL + '/articles/' + id, body);
  }

  delete(id): Observable<any> {
    return this.http.delete(this.PREFIX_URL + '/articles/' + id);
  }

  /**
   * 创建一个对话框并显示
   *
   * @param data 对话框配置项
   * @returns 可订阅来获取结果
   */
  show(): Observable<any> {
    const componentRef = this.build(FileComponent);
    componentRef.instance.close.subscribe(() => {
      setTimeout(() => this.destroy(componentRef), 300);
    });
    return componentRef.instance.show();
  }
}
