import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {CoreModule} from './@core/core.module';
import {SharedModule} from './@shared/shared.module';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {environment} from '../environments/environment';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule.forRoot(),
    SharedModule.forRoot(),
    AppRoutingModule,
    IonicModule.forRoot({
      mode: 'ios'
    }),
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    {provide: 'PREFIX_URL', useValue: environment.PREFIX_URL},
    {provide: 'FILE_PREFIX_URL', useValue: environment.FILE_PREFIX_URL},
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
