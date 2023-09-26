import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { UserInfoComponent } from './user-info/user-info.component';
import { SurnameInitialPipe } from '../../pipes/surname-initial.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, UserInfoComponent, SurnameInitialPipe]
})
export class HomePageModule {
  
}
