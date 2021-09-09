import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskModule} from '../mask';
import {MatIconModule} from '@angular/material/icon';
import {UploaderModule} from '../uploader';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {IonicModule} from '@ionic/angular';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

import {FileComponent} from './file.component';
import {FileViewComponent} from './components/view/view.component';
import {FileUploadComponent} from './components/upload/upload.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaskModule,
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    MatButtonToggleModule,
    IonicModule,
    UploaderModule
  ],
  declarations: [FileComponent, FileViewComponent, FileUploadComponent],
  exports: [UploaderModule, FileComponent, FileViewComponent, FileUploadComponent],
  entryComponents: [FileComponent],
  providers: []
})
export class FileModule {
}
