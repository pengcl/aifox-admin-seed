import {Component} from '@angular/core';
import {Platform} from '@ionic/angular';
import {DocService} from './@core/modules/apiDocumentaion/doc.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'aiFox-ADMIN';

  constructor(private platform: Platform, private docSvc: DocService) {
    this.initializeApp();
  }

  initializeApp(): void {
    this.platform.ready().then(() => {
    });
  }
}
