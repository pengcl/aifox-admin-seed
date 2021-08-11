import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {SharedModule} from '../../../../@shared/shared.module';
import {AdminSoftListPage} from './list.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{path: '', component: AdminSoftListPage}])
  ],
  declarations: [AdminSoftListPage]
})
export class AdminSoftListPageModule {
}
