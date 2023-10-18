import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.interface';

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
  private _id: number = 0;
  private _users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  public users$: Observable<User[]> = this._users.asObservable();

  constructor(
    private httpClient:HttpClient
  ) { }

  // Implementamos los métodos de la interfaz
  getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(environment.API_URL + "users").pipe(tap(_users=>{
      this._users.next(_users);
    }));
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

  addUser(user: User): Observable<User> {
    return new Observable(observer => {
      if (user) {
        let _users = [...this._users.value];
        user.id = ++this._id;
        _users.push(user);
        this._users.next(_users);
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
