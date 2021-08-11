import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {SharedModule} from '../../../../@shared/shared.module';
import {AdminCaseListPage} from './list.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{path: '', component: AdminCaseListPage}])
  ],
  declarations: [AdminCaseListPage]
})
export class AdminCaseListPageModule {
}
