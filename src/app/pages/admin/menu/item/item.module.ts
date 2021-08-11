import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {SharedModule} from '../../../../@shared/shared.module';
import {AdminMenuItemPage} from './item.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{path: '', component: AdminMenuItemPage}])
  ],
  declarations: [AdminMenuItemPage]
})
export class AdminMenuItemPageModule {
}
