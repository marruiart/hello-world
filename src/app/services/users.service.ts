import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../components/home/models/user.interface';
import { FavoritesService } from './favorites.service';

export interface UserInterface {
  // Métodos de la interfaz para el CRUD
  getAll(): Observable<User[]>;
  getUser(id: number): Observable<User>;
  updateUser(user: User): Observable<User>;
  deleteUser(user: User): Observable<User>;
  deleteAll(): Observable<void>
}

export class UserNotFoundException extends Error { }

@Injectable({
  providedIn: 'root' // Lo hace visible en todos los módulos
})
export class UsersService implements UserInterface {
  private _users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  public users$: Observable<User[]> = this._users.asObservable();

  constructor(private favs: FavoritesService) { }

  // Implementamos los métodos de la interfaz
  getAll(): Observable<User[]> {
    return new Observable(observer => {
      setTimeout(() => {
        let usersData: User[] = [
          { id: 0, name: "Juan A.", surname: "García Gómez", age: 46, fav: false },
          { id: 1, name: "María del Mar", surname: "Valencia Valencia", age: 46, fav: false },
          { id: 2, name: "Alejandro", surname: "García Gómez", age: 45, fav: false },
          { id: 3, name: "Juan", surname: "García Valencia", age: 4, fav: false },
          { id: 4, name: "Lydia", surname: "García Robles", age: 11, fav: false }
        ];
        this._users.next(usersData);
        observer.next(usersData);
        observer.complete();
      }, 1000);
    });
  }

  getUser(id: number): Observable<User> {
    return new Observable(observer => {
      let user = this._users.value.find(u => u.id == id);
      if (user) {
        observer.next(user);
      } else {
        observer.error(new UserNotFoundException());
      }
      observer.complete();
    });
  }

  updateUser(user: User): Observable<User> {
    return new Observable(observer => {
      let _users = [...this._users.value];
      let index = _users.findIndex(u => u.id == user.id);
      if (index != -1) {
        _users[index] = user;
        this._users.next(_users);
        observer.next(user);
      } else {
        observer.error(new UserNotFoundException());
      }
      observer.complete();
    });
  }

  deleteUser(user: User): Observable<User> {
    let index = this._users.value.findIndex(u => u.id == user.id);
    return new Observable(observer => {
      if (index != -1) {
        let removedUser = this._users.value[index];
        let _users = [...this._users.value.slice(0, index), ...this._users.value.slice(index + 1)];
        this.favs.deleteFav(index).subscribe((_) => {
          console.log("Favorito eliminado");
        });
        this._users.next(_users);
        observer.next(removedUser);
      } else {
        observer.error(new UserNotFoundException());
      }
      observer.complete();
    })
  }

  deleteAll(): Observable<void> {
    return new Observable(observer => {
      this._users.next([]);
      observer.next();
      observer.complete()
    });
  }


}
