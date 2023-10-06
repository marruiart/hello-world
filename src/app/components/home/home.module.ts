import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { MyUppercasePipe } from 'src/app/components/home/pipes/my-uppercase.pipe';
import { HighlightDirective } from './directives/highlight.directive';
import { SharedModule } from 'src/app/shared-module/shared.module';
import { IonicModule } from '@ionic/angular';
import { FavsPipe } from './pipes/favs.pipe';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HomePageRoutingModule,
    SharedModule,
    IonicModule
  ],
  declarations: [
    HomePage,
    FavsPipe,
    MyUppercasePipe,
    HighlightDirective
  ]
})
export class HomePageModule {

}
