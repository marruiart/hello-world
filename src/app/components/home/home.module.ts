import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { MyUppercasePipe } from 'src/app/components/home/pipes/my-uppercase.pipe';
import { SharedModule } from 'src/app/shared-module/shared.module';
import { IonicModule } from '@ionic/angular';
import { FavsPipe } from '../../shared-module/pipes/favs.pipe';



@NgModule({
  imports: [
    FormsModule,
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
