import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { IonicModule } from '@ionic/angular';
import { SurnameInitialPipe } from './pipes/surname-initial.pipe';
import { FavInfoComponent } from './components/fav-info/fav-info.component';
import { HighlightDirective } from './directives/highlight.directive';
import { FavsPipe } from './pipes/favs.pipe';



@NgModule({
  declarations: [
    UserInfoComponent,
    FavInfoComponent,
    SurnameInitialPipe,
    HighlightDirective,
    FavsPipe
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    CommonModule, // Al exportar este módulo aquí, podemos quitarlo de la importación de los demás módulos
    IonicModule,
    UserInfoComponent,
    FavInfoComponent,
    HighlightDirective,
    FavsPipe
  ]
})
export class SharedModule { }
