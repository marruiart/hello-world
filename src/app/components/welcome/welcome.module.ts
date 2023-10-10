import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared-module/shared.module';

import { WelcomePageRoutingModule } from './welcome-routing.module';

import { WelcomePage } from './welcome.page';

@NgModule({
  imports: [
    FormsModule,
    IonicModule,
    WelcomePageRoutingModule,
    SharedModule  ],
  declarations: [
    WelcomePage
  ]
})
export class WelcomePageModule {}
