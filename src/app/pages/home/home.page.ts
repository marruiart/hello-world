import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController, ToastOptions } from '@ionic/angular';
import { zip } from 'rxjs';
import { User } from 'src/app/core/models/user.interface';
import { FavoritesService } from 'src/app/core/services/favorites.service';
import { UsersService } from 'src/app/core/services/users.service';
import { UserFormComponent } from 'src/app/shared-module/components/user-form/user-form.component';
import { UserInfoFavClicked } from '../../shared-module/components/user-info/user-info-fav-clicked.interface';


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
    public favs: FavoritesService,
    public modal: ModalController
  ) { }

  ngOnInit(): void {
    this.loading = true;
    zip(this.users.getAll(), this.favs.getAll()).subscribe({
      next: res => {
        this.loading = false;
      },
      error: err => {
        console.error(err);
      }
    });
  }


  undoChanges(id: number, isAddFav: boolean) {
    let obs = isAddFav ? this.favs.addFav(id) : this.favs.deleteFav(id);
    obs.subscribe({
      next: user => {
        console.log(user);
      },
      error: err => {
        console.log(err);
      }
    });
  }

  async presentForm(data: User | null, onDismiss: ((result: any) => void)) {
    const modal = await this.modal.create({
      component: UserFormComponent,
      componentProps: {
        mode: data ? 'Edit' : 'New',
        user: data
      },
      cssClass: "modal-ful-right-side"
    });
    modal.present();
    modal.onDidDismiss().then(result => {
      // result recibe el rol del modal y el data
      if (result && result.data) {
        onDismiss(result);
      }
    })
  }

  onCardClicked(user: User) {
    let onDismiss = (info: any) => {
      switch (info.role) {
        case 'submit': {
          this.users.updateUser(info.data).subscribe(async user => {
            const options: ToastOptions = {
              message: `Usuario ${user.id} modificado`,
              duration: 1000,
              position: 'bottom',
              color: 'danger',
            };

            //creamos el toast y lo presentamos (es una promesa por eso el then)
            const toast = await this.toast.create(options);
            toast.present();
          })
        }
          break;
        case 'delete': {
          this.users.deleteUser(info.data).subscribe(async user => {
            const options: ToastOptions = {
              message: `Usuario eliminado`,
              duration: 1000,
              position: 'bottom',
              color: 'danger',
            };

            //creamos el toast y lo presentamos (es una promesa por eso el then)
            const toast = await this.toast.create(options);
            toast.present();
          })
        }
          break;
        default: {
          console.error("No debería entrar")
        }
      }
    }
    this.presentForm(user, onDismiss);
  }

  onNewUser() {
    let onDismiss = (info: any) => {
      switch (info.role) {
        case 'submit': {
          this.users.addUser(info.data).subscribe(async user => {
            const options: ToastOptions = {
              message: `Usuario creado`,
              duration: 1000,
              position: 'bottom',
              color: 'danger',
              cssClass: 'del-ion-toast' //Una clase que podemos poner en global.scss para configurar el ion-toast
            };

            //creamos el toast y lo presentamos (es una promesa por eso el then)
            const toast = await this.toast.create(options);
            toast.present();
          })
        }
          break;
        default: {
          console.error("No debería entrar")
        }

      }
    }
    this.presentForm(null, onDismiss);
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
          buttons: [{
            text: 'deshacer',
            handler: () => {
              this.undoChanges(id, !event.fav);
            }
          }],
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
    if (user.fav) {
      zip(this.users.deleteUser(user), this.favs.deleteFav(user.id)).subscribe({
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
        },
        error: err => {
          console.error(err);
        }
      });
    } else {
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
          console.error(err);
        }
      });
    }
  }

}
