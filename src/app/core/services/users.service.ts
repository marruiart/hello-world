import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth } from '../models/auth.interface';
import { UserLogin, User } from '../models/user.interface';
import { ApiService } from './api.service';

export class LoginErrorException extends Error { }
export class UserNotFoundException extends Error { }

let mapUser = (res: any) => {
  return {
    id: res.data.id,
    avatar: res.data.attributes.avatar ?? undefined,
    nickname: res.data.attributes.nickname,
    name: res.data.attributes.name,
    surname: res.data.attributes.surname,
    age: res.data.attributes.age,
    fav: res.data.attributes.fav,
    user_id: res.data.attributes.user_id?.data.id
  }
}

@Injectable({
  providedIn: 'root' // Lo hace visible en todos los módulos
})
export class UsersService extends ApiService {
  private _users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  public users$: Observable<User[]> = this._users.asObservable();
  public jwt: string = "";

  constructor() {
    super("extended-users");
  }

  login(email: string, password: string) {
    let body = {
      "identifier": email,
      "password": password
    }
    return this.httpClient.post<Auth>(`${environment.API_URL}/api/auth/local`, body).pipe(
      catchError(_ => of(new LoginErrorException("El nombre de usuario o contraseña es incorrecto")))
    );
  }

  logout() {
    this.jwtService.setJwt("");
  }

  signup(username: string, email: string, password: string) {
    let body = {
      username: username,
      email: email,
      password: password
    }
    this.httpClient.post(`${environment.API_URL}/api/auth/local/register`, body).subscribe({
      next: res => {
        console.log(res);
      },
      error: err => {
        console.error(err);
      }
    });
  }

  public changePassword(oldPasswd: string, newPasswd: string) {
    let passwd = {
      currentPassword: oldPasswd,
      password: newPasswd,
      passwordConfirmation: newPasswd
    }
    return this.httpClient.post<any>(`${environment.API_URL}/api/auth/change-password`, passwd, this._options);
  }

  public getMe(): Observable<UserLogin> {
    return this.httpClient.get<any>(`${environment.JSON_URL}/users/me`).pipe(map(res => {
      let user: UserLogin = {
        id: res.id,
        username: res.username,
        email: res.email
      }
      return user;
    }));
  }

  public getAllUsers(): Observable<User[]> {
    return super.getAll<User[]>("users", (res: any) => {
      return Array.from(res.data).reduce((prev: User[], user: any): User[] => {
        let _user: User = {
          id: user.id,
          avatar: user.attributes.avatar ?? undefined,
          nickname: user.attributes.nickname,
          name: user.attributes.name,
          surname: user.attributes.surname,
          age: user.attributes.age,
          fav: user.attributes.fav,
          user_id: user.attributes.user_id?.data.id
        }
        prev.push(_user);
        return prev;
      }, []);
    }).pipe(tap(res => {
      this._users.next(res);
    }));
  }

  public getUser(id: number): Observable<User> {
    return super.get<User>(id, mapUser);
  }

  public addUser(user: User): Observable<User> {
    let body: any = {
      data: {
        avatar: user.avatar ?? null,
        nickname: user.nickname,
        name: user.name,
        surname: user.surname,
        age: user.age ?? null,
        fav: user.fav ?? false,
        user_id: user.user_id
      }
    }
    return super.add<User>(body, mapUser).pipe(tap(_ => {
      this.getAllUsers().subscribe();
    }));
  }


  public updateUser(id: number, user: User): Observable<User> {
    let body: any = {
      data: {
        avatar: user.avatar ?? null,
        nickname: user.nickname,
        name: user.name,
        surname: user.surname,
        age: user.age ?? null,
        fav: user.fav ?? false,
        user_id: user.user_id
      }
    }
    return super.update<User>(id, body, mapUser).pipe(tap(_ => {
      this.getAllUsers().subscribe();
    }));;
  }


  public deleteUser(id: number): Observable<User> {
    return super.delete<User>(id, mapUser).pipe(tap(_ => {
      this.getAllUsers().subscribe();
    }));;
  }

}
