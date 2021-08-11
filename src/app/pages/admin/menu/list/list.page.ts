import {Component, HostBinding, Injector} from '@angular/core';
import {ToastController} from '@ionic/angular';
import {listToTable} from '../../../../@core/utils/extend';
import {AppListBaseComponent} from '../../../../@shared/components/base/base.component';
import {isObject} from 'lodash-es';

const listToTree = (items, keys, lan) => {
  let is = [];
  items.forEach(item => {
    is.push({
      id: item.id,
      parentId: item.menu ? item.menu.id : 0,
      content_type: item.content_type,
      template: item.template.code,
      channel: item.channel.code,
      value: (() => {
        const value = {};
        keys.forEach(keyItem => {
          value[keyItem.name] = item[keyItem.code];
          if (item[keyItem.code] && isObject(item[keyItem.code])) {
            value[keyItem.name] = item[keyItem.code]['name_' + lan];
          }
        });
        return value;
      })(),
      children: [],
      isExpanded: false,
      isVisible: true,
    });
  });
  is.forEach(element => {
    const parentId = element.parentId;
    if (parentId !== '') {
      is.forEach(ele => {
        if (ele.id === parentId) { // 当内层循环的ID== 外层循环的parendId时，（说明有children），需要往该内层id里建个children并push对应的数组；
          element.isVisible = false;
          element.isExpanded = false;
          ele.children.push(element);
        }
      });
    }
  });
  is = is.filter(i => !i.parentId); // 这一步是过滤，按树展开，将多余的数组剔除；
  return is;
};

@Component({
  selector: 'app-admin-menu-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss']
})
export class AdminMenuListPage extends AppListBaseComponent {
  @HostBinding('class') classes = 'ion-page';
  items;
  opts = {
    customColumnOrder: [this.translate('name'), this.translate('menu'), this.translate('channel'), this.translate('template')]
  };

  constructor(injector: Injector,
              public toastController: ToastController) {
    super(injector);
    this.getData();
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getData(): void {
    this.menuSvc.items().subscribe(res => {
      // let items = this.formatList(res, 'name_' + this.lan);
      const items = listToTree(res, [
        {name: this.translate('name'), code: 'name_' + this.lan},
        {name: this.translate('menu'), code: 'menu'},
        {name: this.translate('channel'), code: 'channel'},
        {name: this.translate('template'), code: 'template'}
      ], this.lan);
      this.items = items;
    });
  }

  addMenu(): void {
    this.router.navigate(['/admin/menu/item', 0]).then();
  }

  addArticle(e): void {
    this.router.navigate(['/admin/' + e.channel + '/item', 0], {queryParams: {menu: e.id}}).then();
  }

  addSubmenu(e): void {
    this.router.navigate(['/admin/menu/item', 0], {queryParams: {parent: e.id}}).then();
  }

  editMenu(e): void {
    this.router.navigate(['/admin/menu/item', e.id]).then();
  }

  titleClicked(e): void {
    this.editMenu(e);
  }

  viewArticles(e): void {
    this.router.navigate(['/admin/article/list'], {queryParams: {menu: e.id}}).then();
  }

  delMenu(e): void {
    this.dialogSvc.show({content: '您确定要删除这条信息吗？', confirm: '是的', cancel: '不了'}).subscribe(info => {
      if (info.value) {
        /*this.menuSvc.delete(e.id).subscribe(res => {
          if (res) {
            this.presentToast().then();
          }
        });*/
      }
    });
  }

  async presentToast(): Promise<any> {
    const toast = await this.toastController.create({
      message: '删除成功!',
      duration: 1000
    });
    await toast.present();
    this.getData();
  }

}
