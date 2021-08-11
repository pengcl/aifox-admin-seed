import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {SharedModule} from '../../../../@shared/shared.module';
import {AdminArticleItemPage} from './item.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{path: '', component: AdminArticleItemPage}])
  ],
  declarations: [AdminArticleItemPage]
})
export class AdminArticleItemPageModule {
}
