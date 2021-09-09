import {
  Component,
  OnDestroy,
  Input, Inject, Output, EventEmitter
} from '@angular/core';

import {FileService} from '../../file.service';

import {getPages} from '../../../../../@core/utils/extend';

@Component({
  selector: 'app-file-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class FileViewComponent implements OnDestroy {
  @Input() multiple;
  @Input() params;
  @Input() count;
  @Input() items;
  @Output() askForRefresh: EventEmitter<any> = new EventEmitter<any>();
  @Output() askForDismiss: EventEmitter<boolean> = new EventEmitter<any>();
  @Output() askForType: EventEmitter<boolean> = new EventEmitter<any>();
  pages;

  constructor(@Inject('PREFIX_URL') public PREFIX_URL, private fileSvc: FileService) {
  }

  ngOnDestroy(): void {
  }

  show(): void {
    this.fileSvc.show().subscribe(res => {
      console.log(res);
    });
  }

  prev(): any {
    const currentPage = (this.params._start / this.params._limit) + 1;
    if (currentPage === 1) {
      return false;
    }

    this.changePage(currentPage - 1);
  }

  next(): any {
    const currentPage = (this.params._start / this.params._limit) + 1;
    const lastPage: any = Math.floor((this.count / this.params._limit) - 0.1) + 1;
    if (currentPage === lastPage) {
      return false;
    }
    this.changePage(currentPage + 1);
  }

  changePage(page): void {
    this.params._start = (page - 1) * this.params._limit;
    this.pages = getPages(this.params, this.count);
    this.askForRefresh.next();
  }

  get currentPage(): number {
    const currentPage = (this.params._start / this.params._limit) + 1;
    return currentPage;
  }

  changeType(type): void {
    this.askForType.next(type);
  }

  getType(mime, type): any {
    if (!mime) {
      return mime;
    }
    return mime.split('/')[type];
  }

  _onSelect(type): void {
    this.askForDismiss.next(type);
  }
}
