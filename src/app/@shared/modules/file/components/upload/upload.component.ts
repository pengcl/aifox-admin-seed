import {
  Component,
  OnDestroy,
  Input, Inject, Output, EventEmitter
} from '@angular/core';

import {FileService} from '../../file.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class FileUploadComponent implements OnDestroy {
  @Input() multiple;
  @Input() medias;
  @Output() askForRefresh: EventEmitter<any> = new EventEmitter<any>();

  constructor(@Inject('PREFIX_URL') public PREFIX_URL, private fileSvc: FileService) {
  }

  deleteSuccess(e): void {
  }

  uploadSuccess(e): void {
  }

  ngOnDestroy(): void {
  }

  confirm(): void {
  }
}
