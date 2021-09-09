import {Component, EventEmitter, Inject, Input, Output} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {forwardRef} from '@angular/core';
import {ToastService} from '../../toast';
import {Uploader} from '../uploader.class';
import {UploaderOptions} from '../uploader.options';
import {AuthService} from '../../../../pages/auth/auth.service';
import {UploadService} from '../upload.service';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UploaderComponent),
      multi: true
    }
  ]
})
export class UploaderComponent {
  @Input() required;
  @Input() multiple;
  @Input() medias;
  @Output() uploadSuccess = new EventEmitter();
  @Output() deleteSuccess = new EventEmitter();
  public value: any;
  public disable = false;
  that = this;
  uploader: Uploader = new Uploader({
    method: 'POST',
    alias: 'files',
    url: this.PREFIX_URL + '/upload',
    withCredentials: false,
    headers: [
      {
        name: 'Authorization', value: 'Bearer ' + this.authSvc.token().jwt,
      }],
    params: {
      fileInfo: JSON.stringify({alternativeText: '', caption: '', name: null})
    },
    auto: true,
    onUploadSuccess: (fileItem, res, index, header): void => {
      this.onChange(this.value = JSON.parse(res).id);
      this.uploadSuccess.next(JSON.parse(res));
    },
    onUploadStart: (): void => {
      this.toastSvc.loading('上传中...', 0);
    },
    onUploadComplete: (): void => {
      this.toastSvc.hide();
      this.toastSvc.success('保存成功', 1000);
    }
  } as UploaderOptions);

  constructor(@Inject('PREFIX_URL') private PREFIX_URL,
              private toastSvc: ToastService,
              private authSvc: AuthService,
              private uploadSvc: UploadService) {
  }

  delQueue(item): void {
    this.uploader.removeFromQueue(item);
  }

  delItem(item): void {
    this.uploadSvc.delete(item.id).subscribe(() => {
      this.medias = this.medias.filter(media => {
        return media.id !== item.id;
      });
      return this.medias;
    });
  }

  onChange: any = () => {
  }
  onTouch: any = () => {
  }

  public tapAdd(): void {
    if (this.disable) {
      return;
    }
    this.onChange(++this.value);
  }

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disable = isDisabled;
  }
}
