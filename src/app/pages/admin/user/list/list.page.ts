import {Component, HostBinding, Injector} from '@angular/core';
import {UserService} from '../user.service';
import {ToastController} from '@ionic/angular';
import {MatTableDataSource} from '@angular/material/table';
import {AppListBaseComponent} from '../../../../@shared/components/base/base.component';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss']
})
export class AdminUserListPage extends AppListBaseComponent {
  @HostBinding('class') classes = 'ion-page';
  items;
  displayedColumns: string[] = ['select', 'username', 'email', 'role', 'confirmed', 'actions'];
  menu = this.route.snapshot.queryParams.menu;

  constructor(private injector: Injector,
              private userSvc: UserService,
              public toastController: ToastController) {
    super(injector);
    this.getData();
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getData(): void {
    const body: any = {};
    this.userSvc.find(body).subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
    });
  }

  addUser(): void {
    this.router.navigate(['/admin/user/item', 0], {queryParamsHandling: 'merge'}).then();
  }

  handleToEdit(row): void {
    this.router.navigate(['/admin/user/item', row.id], {queryParamsHandling: 'merge'}).then();
  }

  handleToDel(row): void {
    this.dialogSvc.show({
      content: this.translate('dialog_msg'),
      confirm: this.translate('confirm'),
      cancel: this.translate('cancel')
    }).subscribe(info => {
      if (info.value) {
        this.toastSvc.loading('删除中...', 0);
        this.userSvc.delete(row.id).subscribe(res => {
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
