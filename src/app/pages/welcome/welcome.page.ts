import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, ToastOptions } from '@ionic/angular';
import { UsersService } from 'src/app/core/services/users.service';
import { User } from '../../core/models/user.interface';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  public id!: number;
  public user!: User;
  public loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private users: UsersService,
    private toast: ToastController
  ) { }

  ngOnInit() {
    this.loading = true;
    const paramId = this.route.snapshot.paramMap.get('id');
    console.log(paramId);
    if (paramId) {
      this.id = parseInt(paramId);
      this.users.getUser(this.id).subscribe({
        next: _ => {
          this.loading = false;
        },
        error: err=> {
          console.error(err);
        }
      });
    }
  }

  home() {
    this.router.navigate([`/home`])
  }

  onDeleteClicked(user: User) {
    this.users.deleteUser(user.id).subscribe({
      next: user => {
        const options: ToastOptions = {
          message: `Usuario con id ${user.id} eliminado`,
          duration: 1000,
          position: 'bottom',
          color: 'danger',
          cssClass: 'del-ion-toast' //Una clase que podemos poner en global.scss para configurar el ion-toast
        };

        //creamos el toast y lo presentamos (es una promesa por eso el then)
        this.toast.create(options).then(toast => toast.present());
        this.home();
      },
      error: err => {
        console.error(err);
        this.home();
      }
    });
  }


}
