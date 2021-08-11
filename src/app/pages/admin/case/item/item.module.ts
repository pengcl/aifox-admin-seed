import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {SharedModule} from '../../../../@shared/shared.module';
import {AdminCaseItemPage} from './item.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{path: '', component: AdminCaseItemPage}])
  ],
  declarations: [AdminCaseItemPage]
})
export class AdminCaseItemPageModule {
}
