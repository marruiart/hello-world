import { Component, Input, OnInit } from '@angular/core';
import { ToastController, ToastOptions } from '@ionic/angular';
import { ToDo } from 'src/app/core/models/task.interface';
import { User } from 'src/app/core/models/user.interface';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-task-info',
  templateUrl: './task-info.component.html',
  styleUrls: ['./task-info.component.scss'],
})
export class TaskInfoComponent implements OnInit {
  @Input() task: ToDo | null = null;
  public user: User | null = null;

  constructor(
    private usersService: UsersService,
    private toast: ToastController
  ) { }

  ngOnInit() {
    if (this.task) {
      this.usersService.getUser(this.task.id).subscribe({
        next: res => {
          this.user = res;
          const options: ToastOptions = {
            message: `Usuario creado`,
            duration: 1000,
            position: 'bottom',
            color: 'danger',
            cssClass: 'del-ion-toast' //Una clase que podemos poner en global.scss para configurar el ion-toast
          };
  
          //creamos el toast y lo presentamos (es una promesa por eso el then)
          this.toast.create(options).then(toast => toast.present());
        },
        error: err => {
          console.error(err);
        }
      });
    }
  }

}
