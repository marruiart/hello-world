import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, ToastOptions } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/models/user.interface';
import { UsersService } from 'src/app/services/users.service';
import { UserInfoFavClicked } from './user-info/user-info-fav-clicked.interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public loading: boolean = false;

  constructor(
    private router: Router,
    private toast: ToastController,
    public users: UsersService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.users.getAll().subscribe(() => {
      this.loading = false;
    });
  }

  welcome() {
    this.router.navigate(["/welcome"]);
  }

  /**
   * Recibe el evento emitido por el botón de añadir a favorito en el userInfoComponent
   * @param user usuario asociado a la tarjeta
   * @param event objeto del tipo UserInfoFavClicked que tiene una propiedad fav que indica si hay que añadir o eliminar de la lista de favoritos
   */
  onFavClicked(user: User, event: UserInfoFavClicked) {
    let _user: User = { ...user };
    _user.fav = event.fav ?? false;
    this.users.updateUser(_user).subscribe({
      next: user => {
        //Notificamos con un Toast que se ha pulsado
        const options: ToastOptions = {
          message: `Usuario ${event.fav ? 'añadido' : 'eliminado'} ${event.fav ? 'a' : 'de'} favoritos`,
          duration: 1000,
          position: 'bottom',
          color: 'warning',
          cssClass: 'fav-ion-toast' //Una clase que podemos poner en global.scss para configurar el ion-toast
        };

        //creamos el toast y lo presentamos (es una promesa por eso el then)
        this.toast.create(options).then(toast => toast.present());
      },
      error: err => {
        console.log(err);
      }
    });
  }

  onDeleteClicked(user: User) {
    this.users.deleteUser(user).subscribe({
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
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
