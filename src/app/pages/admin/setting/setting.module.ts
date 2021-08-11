import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {SharedModule} from '../../../@shared/shared.module';
import {AdminSettingPage} from './setting.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{path: '', component: AdminSettingPage}])
  ],
  declarations: [AdminSettingPage]
})
export class AdminSettingPageModule {
}
