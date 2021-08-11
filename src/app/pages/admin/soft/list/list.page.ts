import {Component, HostBinding, Injector} from '@angular/core';
import {ArticleService} from '../../article/article.service';
import {ToastController} from '@ionic/angular';
import {MatTableDataSource} from '@angular/material/table';

import {AppListBaseComponent} from '../../../../@shared/components/base/base.component';

@Component({
  selector: 'app-admin-file-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss']
})
export class AdminSoftListPage extends AppListBaseComponent {
  @HostBinding('class') classes = 'ion-page';
  items;
  displayedColumns: string[] = ['select', 'id', 'title_' + this.lan, 'actions'];

  constructor(private injector: Injector,
              private articleSvc: ArticleService,
              public toastController: ToastController) {
    super(injector);
    this.getData();
  }

  getData(): void {
    this.articleSvc.items().subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
    });
  }

  addArticle(): void {
    this.router.navigate(['/admin/article/item', 0]).then();
  }

  handleToEdit(row): void {
    this.router.navigate(['/admin/article/item', row.id]).then();
  }

  handleToDel(row): void {
    this.dialogSvc.show({
      content: this.translate('dialog_msg'),
      confirm: this.translate('confirm'),
      cancel: this.translate('cancel')
    }).subscribe(info => {
        if (info.value) {
          this.articleSvc.delete(row.id).subscribe();
        }
      });
  }

  async presentToast(): Promise<void> {
    const toast = await this.toastController.create({
      message: '删除成功!',
      duration: 1000
    });
    await toast.present();
    this.getData();
  }

}
