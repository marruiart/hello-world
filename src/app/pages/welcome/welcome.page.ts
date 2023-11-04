import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, ToastOptions } from '@ionic/angular';
import { zip } from 'rxjs';
import { FavoritesService } from 'src/app/core/services/favorites.service';
import { UsersService } from 'src/app/core/services/users.service';
import { UserInfoFavClicked } from 'src/app/shared-module/components/user-info/user-info-fav-clicked.interface';
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
    private favs: FavoritesService,
    private toast: ToastController
  ) { }

  ngOnInit() {
    this.loading = true;
    const paramId = this.route.snapshot.paramMap.get('id');
    console.log(paramId);
    if (paramId) {
      this.id = parseInt(paramId);
      zip(this.users.getUser(this.id), this.favs.getFav(this.id)).subscribe({
        next: res => {
          this.user = res[0];
          this.user.fav = res[1] != undefined;
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


  onFavClicked(id: number, event: UserInfoFavClicked) {
    let obs = (event?.fav) ? this.favs.addFav(id) : this.favs.deleteFav(id);
    obs.subscribe({
      next: user => {
        const options: ToastOptions = {
          message: `Usuario ${user.id} ${event.fav ? "añadido a" : "eliminado de"} favoritos`,
          duration: 1000,
          position: 'bottom',
          color: 'danger',
          cssClass: 'del-ion-toast' //Una clase que podemos poner en global.scss para configurar el ion-toast
        };
        //creamos el toast y lo presentamos (es una promesa por eso el then)
        this.toast.create(options).then(toast => toast.present());
        this.user.fav = event?.fav ?? false;
      },
      error: err => {
        console.error(err);
      }
    });
  }

  onDeleteClicked(user: User) {
    zip(this.users.deleteUser(user.id), this.favs.deleteFav(user.id)).subscribe({
      next: res => {
        let user = res[0];
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
