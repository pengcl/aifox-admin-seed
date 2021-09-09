import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FileThumbDirective} from './file-thumb.directive';
import {UploaderFileDirective} from './uploader.directive';
import {UploaderComponent} from './components/uploader.component';
import {IonicModule} from '@ionic/angular';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [UploaderComponent, UploaderFileDirective, FileThumbDirective],
  exports: [UploaderComponent, UploaderFileDirective, FileThumbDirective],
})
export class UploaderModule {
}
