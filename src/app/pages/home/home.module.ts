import { NgModule } from '@angular/core';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { MyUppercasePipe } from 'src/app/pages/home/pipes/my-uppercase.pipe';
import { SharedModule } from 'src/app/shared-module/shared.module';
import { IonicModule } from '@ionic/angular';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { translateLoaderFactory } from 'src/app/app.module';



@NgModule({
  imports: [
    HomePageRoutingModule,
    IonicModule,
    SharedModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        deps: [HttpClient],
        useFactory: (translateLoaderFactory)
      }
    })
  ],
  declarations: [
    HomePage,
    MyUppercasePipe,
  ]
})
export class HomePageModule {

}
