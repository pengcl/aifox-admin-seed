import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter, Inject,
  Input,
  OnDestroy,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {Observable, Observer, Subscription} from 'rxjs';

import {FileConfig} from './file.config';
import {FileService} from './file.service';
import {getPages} from '../../../@core/utils/extend';

/**
 * 对话框，依赖于 `weui-textarea`、`weui-slider`
 *
 * 关于 `input==='prompt'` 若干细节：
 *  + 对话框内放表单在weui的表现并不是很如意，因此，在对话框增加 `.weui-dialog__prompt` 样式类名，请自行针对性进行一些样式的覆盖，`ngx-dialog` 不提供任何样式的修正。
 *  + 对于录入型表单其校验机制全都是依赖于正则，默认情况下内置 `email`、`url` 两种表单类型的正则。
 */

@Component({
  selector: 'app-file',
  exportAs: 'appFile',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.less'],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class FileComponent implements OnDestroy {
  type: 'upload' | 'view' = 'view';
  @Input() multiple;
  @Input() medias;
  constructor(@Inject('PREFIX_URL') public PREFIX_URL,
              private DEF: FileConfig,
              private cdr: ChangeDetectorRef,
              private fileSvc: FileService) {
    this.getData();
  }

  private observer: Observer<any>;
  shown = false;

  /**
   * 打开动画结束后回调（唯一参数：对话框实例对象）
   */
    // tslint:disable-next-line:no-output-native
  @Output() readonly open = new EventEmitter<FileComponent>();

  /**
   * 关闭动画开始时回调（唯一参数：对话框实例对象）
   */
    // tslint:disable-next-line:no-output-native
  @Output() readonly close = new EventEmitter<FileComponent>();
  params = {
    _limit: 10,
    _start: 0,
    _sort: 'updated_at:DESC'
  };
  items;
  count = 0;
  pages = [];

  @ViewChild('container', {static: true}) container: any;

  getData(): void {
    this.fileSvc.count().subscribe(res => {
      this.count = res;
      this.pages = getPages(this.params, res);
    });
    this.fileSvc.items(this.params).subscribe(res => {
      this.items = res;
      this.cdr.markForCheck();
      this.cdr.detectChanges();
    });
  }

  /**
   * 显示，组件载入页面后并不会显示，显示调用 `show()` 并订阅结果。
   *
   * @returns 当 `type==='prompt'` 时会多一 `result` 属性表示结果值
   */
  show(): Observable<any> {
    this.shown = true;
    this.cdr.detectChanges();
    // 模拟动画结束后回调
    setTimeout(() => {
      this.open.emit(this);
    }, 300);
    return new Observable((observer: Observer<any>) => {
      this.observer = observer;
    });
  }

  hide(): void {

    this.shown = false;
    this.cdr.detectChanges();
    this.close.emit(this);
  }

  dismiss(type): any {
    this.observer.next({});
    this.observer.complete();
    this.hide();
    return false;
  }

  changeType(e): void {
    this.type = e;
  }

  ngOnDestroy(): void {
    if (this.observer && this.observer instanceof Subscription) {
      (this.observer as Subscription).unsubscribe();
    }
  }
}
