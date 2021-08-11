import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {SharedModule} from '../../../../@shared/shared.module';
import {AdminAssetItemPage} from './item.page';
import {UploaderModule} from "../../../../@shared/components/uploader";

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{path: '', component: AdminAssetItemPage}]),
    UploaderModule
  ],
  declarations: [AdminAssetItemPage]
})
export class AdminAssetItemPageModule {
}
