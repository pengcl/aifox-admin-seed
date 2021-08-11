import {Component, Injector} from '@angular/core';
import {NavParams, ModalController} from '@ionic/angular';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AppBaseComponent} from '../base/base.component';

@Component({
  selector: 'app-custom-type',
  templateUrl: './customType.component.html',
  styleUrls: ['./customType.component.scss']
})
export class CustomTypeComponent extends AppBaseComponent {
  data;
  form = new FormGroup({});

  constructor(injector: Injector, private navParams: NavParams,
              private modalController: ModalController) {
    super(injector);
    this.data = this.navParams.data;
    console.log(this.data);
    this.getKeys('custom-type', ['menu', 'name_' + this.lan, 'code']);
    this.getSelections(this.keys).subscribe(res => {
      this.selector = res;
      this.form.get('menu').setValue(this.data.menu);
    });
  }

  dismiss(): any {
    this.modalController.dismiss().then();
  }

  save(): any {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return false;
    }
    this.customTypeSvc.create(this.form.value).subscribe(() => {
      this.modalController.dismiss(this.form.value).then();
    });
  }

}
