import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AssetService} from '../asset.service';
import {ToastController} from '@ionic/angular';
import {listToTable} from '../../../../@core/utils/extend';

const opts = {
  elevation: 5,
  customColumnOrder: ['文件名', '类型']
};

@Component({
  selector: 'app-admin-asset-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss']
})
export class AdminAssetListPage {
  items;
  opts = opts;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private assetSvc: AssetService,
              public toastController: ToastController) {
    this.getData();
  }

  getData(): void {
    this.assetSvc.items().subscribe(res => {
      this.items = listToTable(res, [{name: '文件名', code: 'name'}, {name: '类型', code: 'asset_type.code'}]);
    });
  }

  addAsset(): void {
    this.router.navigate(['/admin/asset/item', 0]).then();
  }

  editMenu(e): void {
    this.router.navigate(['/admin/asset/item', e.id]).then();
  }

  delMenu(e): void {
    this.assetSvc.delete(e.id).subscribe(res => {
      if (res) {
        this.presentToast().then();
      }
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: '删除成功!',
      duration: 1000
    });
    await toast.present();
    this.getData();
  }

}
