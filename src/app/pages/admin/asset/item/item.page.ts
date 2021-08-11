import {Component, Inject} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {DocService} from '../../../../@core/modules/apiDocumentaion/doc.service';
import {AssetService} from '../asset.service';
import {ToastController} from '@ionic/angular';
import {MenuService} from '../../menu/menu.service';
import {Uploader, UploaderOptions} from '../../../../@shared/components/uploader';

@Component({
  selector: 'app-admin-asset-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss']
})
export class AdminAssetItemPage {
  id;
  item;
  menuId;
  form: FormGroup = new FormGroup({
    licenseImg: new FormControl('', [Validators.required]),
    title_cn: new FormControl('', [Validators.required]),
    title_en: new FormControl('', [Validators.required]),
    title_hk: new FormControl('', [Validators.required]),
    content_type: new FormControl('', [Validators.required]),
    menu: new FormControl('', [Validators.required]),
    menus: new FormControl('', [Validators.required]),
    types: new FormControl('', [Validators.required]),
    path: new FormControl('', [Validators.required]),
    thumb: new FormControl('', [Validators.required]),
    poster: new FormControl('', [Validators.required]),
    description_cn: new FormControl('', [Validators.required]),
    description_en: new FormControl('', [Validators.required]),
    description_hk: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required])
  });

  uploader: Uploader = new Uploader({
    url: this.prefix_url + 'uploadFile',
    auto: true,
    params: {
      type: 'cust_cert', dir: 'cust_cert'
    },
    onUploadSuccess: (file, res) => {
      const result = JSON.parse(res);
      this.form.get('licenseImg').setValue(result.result);
    }
  } as UploaderOptions);

  constructor(private route: ActivatedRoute,
              private router: Router,
              private docSvc: DocService,
              private assetSvc: AssetService,
              public toastController: ToastController,
              private menuSvc: MenuService,
              // tslint:disable-next-line:variable-name
              @Inject('PREFIX_URL') public prefix_url) {
    this.ionViewDidEnter();
  }


  ionViewDidEnter(): void {
    this.id = this.route.snapshot.params.id;
    this.menuId = this.route.snapshot.queryParams.menu;
    if (this.id !== '0') {
      this.getData();
    } else {
      if (this.menuId) {
        this.menuSvc.items().subscribe(res => {
          res.forEach(item => {
            if (item.id === Number(this.menuId)) {
              const menu = {
                content: item.content,
                content_type: item.content_type.id,
                created_at: item.created_at,
                created_by: item.created_by.id,
                description: item.description,
                description_cn: item.description_cn,
                description_en: item.description_en,
                description_hk: item.description_hk,
                id: item.id,
                menu: item.menu.id,
                name_cn: item.name_cn,
                name_en: item.name_en,
                name_hk: item.name_hk,
                path: item.path,
                poster: item.poster,
                published_at: item.published_at,
                show: item.show,
                thumb: item.thumb,
                type: item.type,
                updated_at: item.updated_at,
                updated_by: item.updated_by.id
              };
              this.form.get('menu').setValue(menu);
            }
          });
        });
      }
    }
  }

  getData() {
    this.assetSvc.item(this.id).subscribe(res => {
      this.item = res;
      this.form.get('title_cn').setValue(res.title_cn);
      this.form.get('title_en').setValue(res.title_en);
      this.form.get('title_hk').setValue(res.title_hk);
      this.form.get('description_cn').setValue(res.description_cn);
      this.form.get('description_en').setValue(res.description_en);
      this.form.get('description_hk').setValue(res.description_hk);
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: '保存成功!',
      duration: 1000
    });
    await toast.present();
    this.router.navigate(['/admin/article/list']).then();
  }


  save() {
    /*if (this.form.invalid) {
      return false;
    }*/
    if (this.id !== '0') {
      this.assetSvc.update(this.id, this.form.value).subscribe(res => {
        if (res) {
          this.presentToast().then();
        }
      });
    } else {
      this.assetSvc.create(this.form.value).subscribe(res => {
        if (res) {
          this.presentToast().then();
        }
      });
    }

  }


}
