import {Directive, ElementRef, Inject, Input, OnChanges} from '@angular/core';
import {genImageUrl} from '../../../@core/utils/browser';

/**
 * 创建缩略图
 */
// tslint:disable-next-line:directive-selector
@Directive({selector: '[weui-thumb]'})
export class FileThumbDirective implements OnChanges {
  /**
   * 文件对象，必填项
   */
  @Input('weui-thumb') file: File;

  constructor(@Inject('PREFIX_URL') private PREFIX_URL, private el: ElementRef) {
  }

  private render(): any {
    const url = genImageUrl(this.file);
    if (!url) {
      return;
    }

    this.el.nativeElement.style.backgroundImage = `url(${url})`;
  }

  ngOnChanges(): void {
    this.render();
  }
}
