import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
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
    private httpClient: HttpClient
  ) { }

  // Implementamos los métodos de la interfaz
  getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${environment.API_URL}/users`).pipe(map((users: any[]) => {
      return users.map((_user: any) => {
        return {
          id: _user.id,
          name: _user.name,
          surname: _user.surname,
          age: _user.age
        }
      });
    }));
  }

  getUser(id: number): Observable<User> {
    return this.httpClient.get<User>(`${environment.API_URL}/users/${id}`);
  }

  addUser(user: User): Observable<User> {
    // MAPEO DE LO QUE RECIBIMOS (SI QUEREMOS ADAPTAR A UN TIPO CONCRETO LO QUE SE RECIBE)
    return this.httpClient.post<User>(`${environment.API_URL}/users`, user).pipe(map(buffer => {
      let json = JSON.parse(JSON.stringify(buffer));
      let _user: User = {
        "id": json.id,
        "name": json.name,
        "surname": json.surname,
        "age": json.age
      }
      let _users = [...this._users.value];
      _users.push(_user);
      this._users.next(_users);
      return _user;
    }));
  }

  updateUser(user: User): Observable<User> {
    let json = JSON.parse(JSON.stringify(user));
    return this.httpClient.patch<User>(`${environment.API_URL}/users/${user.id}`, json).pipe(tap(res => {
      let _users = [...this._users.value];
      let index = _users.findIndex(u => u.id == user.id);
      _users[index] = user;
      this._users.next(_users);
    }));
  }

  deleteUser(user: User): Observable<User> {
    return this.httpClient.delete<User>(`${environment.API_URL}/users/${user.id}`).pipe(map(_ => {
      let index = this._users.value.findIndex(u => u.id == user.id);
      let removedUser = this._users.value[index];
      let _users = [...this._users.value.slice(0, index), ...this._users.value.slice(index + 1)];
      this._users.next(_users);
      return removedUser;
    }));
  }

  deleteAll(): Observable<void> {
    return new Observable(observer => {
      this._users.next([]);
      observer.next();
      observer.complete()
    });
  }


}
