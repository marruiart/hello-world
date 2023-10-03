import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.interface';

export interface UserInterface {
  // Métodos de la interfaz para el CRUD
  getAll(): Observable<User[]>;
  getUser(id: number): Observable<User>;
  updateUser(user: User): Observable<User>;
  deleteUser(user: User): Observable<User>;
  deleteAll(): Observable<void>
}

export class UserNotFoundException extends Error {}

@Injectable({
  providedIn: 'root'
})
export class UsersService implements UserInterface {
  _users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  users$: Observable<User[]> = this._users.asObservable();

  constructor() { }

  // Implementamos los métodos de la interfaz
  getAll(): Observable<User[]> {
    return new Observable(observer => {
      let usersData: User[] = [
        { id: 0, name: "Juan A.", surname: "García Gómez", age: 46, fav: false },
        { id: 1, name: "María del Mar", surname: "Valencia Valencia", age: 46, fav: false },
        { id: 2, name: "Alejandro", surname: "García Gómez", age: 45, fav: false },
        { id: 3, name: "Juan", surname: "García Valencia", age: 4, fav: false },
        { id: 4, name: "Lydia", surname: "García Robles", age: 11, fav: false }
      ];
      this._users.next(usersData);
      observer.next();
      observer.complete();
    });
  }

  getUser(id: number): Observable<User> {
    throw new Error('Method not implemented.');
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
        observer.error(new UserNotFoundException);
      }
    });
  }

  deleteUser(user: User): Observable<User> {
    throw new Error('Method not implemented.');
  }
  deleteAll(): Observable<void> {
    throw new Error('Method not implemented.');
  }


}
