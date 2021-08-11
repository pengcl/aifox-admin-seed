import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {SharedModule} from '../../../../@shared/shared.module';
import {AdminAssetListPage} from './list.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{path: '', component: AdminAssetListPage}])
  ],
  declarations: [AdminAssetListPage]
})
export class AdminAssetListPageModule {
}
