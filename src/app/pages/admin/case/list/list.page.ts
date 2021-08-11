import {Component, HostBinding, Injector} from '@angular/core';
import {CaseService} from '../case.service';
import {ArticleService} from '../../article/article.service';
import {ToastController} from '@ionic/angular';
import {MatTableDataSource} from '@angular/material/table';
import {AppListBaseComponent} from '../../../../@shared/components/base/base.component';

@Component({
  selector: 'app-admin-case-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss']
})
export class AdminCaseListPage extends AppListBaseComponent {
  @HostBinding('class') classes = 'ion-page';
  items;
  displayedColumns: string[] = ['select', 'id', 'title_' + this.lan, 'actions'];
  menu = this.route.snapshot.queryParams.menu;

  constructor(private injector: Injector,
              private articleSvc: ArticleService,
              public toastController: ToastController) {
    super(injector);
    this.getData();
  }

  valueChange(target, e): void {
    /*this.params[target] = e;
    const params = {};
    for (const key in this.params) {
      if (this.params[key]) {
        params[key] = this.params[key];
      }
    }
    this.params = params;
    this.getData();*/
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getData(): void {
    const body: any = {};
    if (this.menu) {
      body['menu.id'] = this.menu;
    }
    this.articleSvc.find(body).subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
    });
  }

  addArticle(): void {
    if (this.menu) {
      this.menuSvc.item(this.menu).subscribe(res => {
        this.router.navigate(['/admin/' + res.channel.code + '/item', 0], {queryParamsHandling: 'merge'}).then();
      });
    } else {
      this.router.navigate(['/admin/article/item', 0], {queryParamsHandling: 'merge'}).then();
    }
  }

  handleToEdit(row): void {
    this.menuSvc.item(row.menu.id).subscribe(res => {
      this.router.navigate(['/admin/' + res.channel.code + '/item', row.id], {queryParamsHandling: 'merge'}).then();
    });
  }

  handleToDel(row): void {
    this.dialogSvc.show({
      content: this.translate('dialog_msg'),
      confirm: this.translate('confirm'),
      cancel: this.translate('cancel')
    }).subscribe(info => {
      if (info.value) {
        this.toastSvc.loading('删除中...', 0);
        this.articleSvc.delete(row.id).subscribe(res => {
          this.toastSvc.hide();
          this.getData();
        });
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
