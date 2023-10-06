import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { IonicModule } from '@ionic/angular';
import { SurnameInitialPipe } from './pipes/surname-initial.pipe';



@NgModule({
  declarations: [
    UserInfoComponent,
    SurnameInitialPipe
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    UserInfoComponent,
    IonicModule
  ]
})
export class SharedModule { }
