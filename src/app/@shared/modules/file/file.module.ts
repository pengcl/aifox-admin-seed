import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskModule} from '../mask';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {IonicModule} from '@ionic/angular';

import {FileComponent} from './file.component';
import {FileViewComponent} from './components/view.component';

@NgModule({
  imports: [CommonModule, FormsModule, MaskModule, MatIconModule, MatTabsModule, MatButtonModule, IonicModule],
  declarations: [FileComponent, FileViewComponent],
  exports: [FileComponent, FileViewComponent],
  entryComponents: [FileComponent],
  providers: []
})
export class FileModule {
}
