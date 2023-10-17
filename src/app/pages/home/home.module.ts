import { NgModule } from '@angular/core';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { MyUppercasePipe } from 'src/app/pages/home/pipes/my-uppercase.pipe';
import { SharedModule } from 'src/app/shared-module/shared.module';
import { IonicModule } from '@ionic/angular';



@NgModule({
  imports: [
    HomePageRoutingModule,
    SharedModule,
    IonicModule,
  ],
  declarations: [
    HomePage,
    MyUppercasePipe,
  ]
})
export class HomePageModule {

}
