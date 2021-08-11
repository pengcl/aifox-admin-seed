import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {SharedModule} from '../../../../@shared/shared.module';
import {AdminFileItemPage} from './item.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{path: '', component: AdminFileItemPage}])
  ],
  declarations: [AdminFileItemPage]
})
export class AdminFileItemPageModule {
}
