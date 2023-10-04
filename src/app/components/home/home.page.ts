import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, ToastOptions } from '@ionic/angular';
import { zip } from 'rxjs';
import { User } from 'src/app/models/user.interface';
import { FavoritesService } from 'src/app/services/favorites.service';
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
    public users: UsersService,
    public favs: FavoritesService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    zip(this.users.getAll(), this.favs.getAll()).subscribe(res => {
      this.loading = false;
    });
  }

  welcome() {
    this.router.navigate(["/welcome"]);
  }

  onFavClicked(user: User, event: UserInfoFavClicked) {
    let obs = (event?.fav) ? this.favs.addFav(user.id) : this.favs.deleteFav(user.id);
    obs.subscribe({
      next: user => {
        const options: ToastOptions = {
          message: `Usuario ${event.fav ? "añadido a" : "eliminado de"} favoritos`,
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

  onDeleteClicked(user: User) {
    this.users.deleteUser(user).subscribe({
      next: user => {
        const options: ToastOptions = {
          message: `Usuario con id ${user.id} eliminado de favoritos`,
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
