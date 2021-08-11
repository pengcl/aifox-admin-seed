import {
  Component,
  OnDestroy,
  Input
} from '@angular/core';

import {FileService} from '../file.service';

@Component({
  selector: 'app-file-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class FileViewComponent implements OnDestroy {
  @Input() multiple;
  @Input() medias;

  constructor(private fileSvc: FileService) {
  }

  ngOnDestroy(): void {
  }

  show(): void {
    this.fileSvc.show().subscribe(res => {
      console.log(res);
    });
  }
}
