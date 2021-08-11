import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {SharedModule} from '../../../../@shared/shared.module';
import {AdminMenuListPage} from './list.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{path: '', component: AdminMenuListPage}])
  ],
  declarations: [AdminMenuListPage]
})
export class AdminMenuListPageModule {
}
