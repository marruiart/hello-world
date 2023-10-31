import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom, map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.interface';

export interface UserInterface {
  // Métodos de la interfaz para el CRUD
  getAll(): Observable<User[]>;
  getUser(id: number): Observable<User>;
  addUser(user: User): Observable<User>;
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

  constructor(
    private httpClient: HttpClient
  ) { }

  // Implementamos los métodos de la interfaz

  public getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${environment.API_URL}/users`).pipe(tap(users => {
      this._users.next(users);
    }));
  }


  public getUser(id: number): Observable<User> {
    return this.httpClient.get<User>(`${environment.API_URL}/users/${id}`);
  }

  public addUser(user: User): Observable<User> {
    let _user: any = {
      name: user.name,
      surname: user.surname,
      age: user.age
    }

    return this.httpClient.post<User>(`${environment.API_URL}/users`, _user).pipe(tap(_ => {
      this.getAll().subscribe();
    }))
  }


  public updateUser(modifiedData: any): Observable<User> {
    return this.httpClient.patch<User>(`${environment.API_URL}/users/${modifiedData.id}`, modifiedData).pipe(tap(_ => {
      this.getAll().subscribe();
    }));
  }


  public deleteUser(user: User): Observable<User> {
    return this.httpClient.delete<User>(`${environment.API_URL}/users/${user.id}`).pipe(tap(_ => {
      this.getAll().subscribe();
    }));
  }


  public deleteAll(): Observable<void> {
    return new Observable(observer => {
      this._users.next([]);
      observer.next();
      observer.complete()
    });
  }


}
