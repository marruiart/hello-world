import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, ToastOptions } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/components/home/models/user';
import { UserInfoFavClicked } from './models/user-info-fav-clicked';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  _users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  users$: Observable<User[]> = this._users.asObservable();

  constructor(private router: Router, private toast: ToastController) { }

  ngOnInit(): void {
    let index = 0;
    let usersData: User[] = [
      { id: 0, name: "Juan A.", surname: "García Gómez", age: 46, fav: false },
      { id: 1, name: "María del Mar", surname: "Valencia Valencia", age: 46, fav: false },
      { id: 2, name: "Alejandro", surname: "García Gómez", age: 45, fav: false },
      { id: 3, name: "Juan", surname: "García Valencia", age: 4, fav: false },
      { id: 4, name: "Lydia", surname: "García Robles", age: 11, fav: false }
    ];

    // Cada segundo mete un usuario nuevo en un array
    setInterval(() => {
      if (index < usersData.length) {
        let users = this._users.value;
        users.push(usersData[index]);
        this._users.next(users);
        index++;
      }
    }, 100);
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
    //creamos una copia del array actual de usuarios
    const users = [...this._users.value];
    //buscamos el índice del usuario para modificar su propiedad fav
    let index = users.findIndex((_user) => _user.id == user.id);
    if (index != -1) {
      console.log(index);
      users[index].fav = event.fav ?? false; //en el caso de que fav sea undefined devolvemos falso.
    }

    //notificamos un nuevo array de usuarios para que se renderice en la plantilla
    this._users.next([...users]);

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
  }
}
