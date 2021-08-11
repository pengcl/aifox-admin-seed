import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {SharedModule} from '../../../../@shared/shared.module';
import {AdminSoftItemPage} from './item.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{path: '', component: AdminSoftItemPage}])
  ],
  declarations: [AdminSoftItemPage]
})
export class AdminSoftItemPageModule {
}
