import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { IonicModule } from '@ionic/angular';
import { SurnameInitialPipe } from './pipes/surname-initial.pipe';
import { FavInfoComponent } from './components/fav-info/fav-info.component';
import { HighlightDirective } from './directives/highlight.directive';
import { FavsPipe } from './pipes/favs.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserFormComponent } from './components/user-form/user-form.component';
import { TaskInfoComponent } from './components/task-info/task-info.component';
import { AvatarSelectableComponent } from './components/user-form/avatar-selectable/avatar-selectable.component';
import { TasksSelectableComponent } from './components/tasks-selectable/tasks-selectable.component';
import { TasksSelectableItemComponent } from './components/tasks-selectable/tasks-selectable-item/tasks-selectable-item.component';


@NgModule({
  declarations: [
    //Components
    UserInfoComponent,
    FavInfoComponent,
    UserFormComponent,
    TaskInfoComponent,
    AvatarSelectableComponent,
    TasksSelectableComponent,
    TasksSelectableItemComponent,
    //Directives
    HighlightDirective,
    //Pipes
    FavsPipe,
    SurnameInitialPipe,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule, // Al exportar este módulo aquí, podemos quitarlo de la importación de los demás módulos
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    //Components
    UserInfoComponent,
    UserFormComponent,
    FavInfoComponent,
    TaskInfoComponent,
    //Directives
    HighlightDirective,
    //Pipes
    FavsPipe
  ]
})
export class SharedModule { }
