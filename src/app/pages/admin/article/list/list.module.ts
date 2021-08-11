import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {SharedModule} from '../../../../@shared/shared.module';
import {AdminArticleListPage} from './list.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{path: '', component: AdminArticleListPage}])
  ],
  declarations: [AdminArticleListPage]
})
export class AdminArticleListPageModule {
}
