import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {SharedModule} from '../../../../@shared/shared.module';
import {AdminUserItemPage} from './item.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{path: '', component: AdminUserItemPage}])
  ],
  declarations: [AdminUserItemPage]
})
export class AdminUserItemPageModule {
}
