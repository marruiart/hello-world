import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth } from '../models/auth/auth.interface';
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
    user_id: res.data.attributes.user_id?.data.id,
    assignments: res.data.attributes.assignments?.data
  }
}

let mapUsers = (res: any) => {
  return Array.from(res.data).reduce((prev: User[], userRes: any): User[] => {
    let _user: User = {
      id: userRes.id,
      avatar: userRes.attributes.avatar ?? undefined,
      nickname: userRes.attributes.nickname,
      name: userRes.attributes.name,
      surname: userRes.attributes.surname,
      age: userRes.attributes.age,
      fav: userRes.attributes.fav,
      user_id: userRes.attributes.user_id?.data.id,
      assignments: userRes.attributes.assignments?.data
    }
    prev.push(_user);
    return prev;
  }, []);
}

@Injectable({
  providedIn: 'root'
})
export class UsersService extends ApiService {
  private path: string = "/api/extended-users";
  private _users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  public users$: Observable<User[]> = this._users.asObservable();
  public jwt: string = "";
  private queries: { [query: string]: string } = { "populate": "user_id,assignments.task" }

  private body: any = (user: User) => {
    return {
      data: {
        avatar: user.avatar ?? null,
        nickname: user.nickname,
        name: user.name,
        surname: user.surname,
        age: user.age ?? null,
        fav: user.fav ?? false,
        user_id: user.user_id,
        assignments: user.assignments
      }
    }
  }

  logout() {
    this.jwtSvc.saveToken("");
  }

/*   signup(username: string, email: string, password: string) {
    let body = {
      username: username,
      email: email,
      password: password
    }
    this.http.post(`${environment.API_URL}/api/auth/local/register`, body).subscribe({
      next: res => {
        console.log(res);
      },
      error: err => {
        console.error(err);
      }
    });
  }

  public getMe(): Observable<UserLogin> {
    return this.http.get<any>(`${environment.JSON_URL}/users/me`).pipe(map(res => {
      let user: UserLogin = {
        id: res.id,
        username: res.username,
        email: res.email
      }
      return user;
    }));
  } */

  public getAllUsers(): Observable<User[]> {
    return this.get<User[]>(this.path, mapUsers, this.queries).pipe(tap(res => {
      this._users.next(res);
    }));
  }

  public getUser(id: number): Observable<User> {
    return this.get<User>(this.path, mapUser, this.queries, id);
  }

  public addUser(user: User): Observable<User> {
    return this.add<User>(this.path, this.body(user), mapUser).pipe(tap(_ => {
      this.getAllUsers().subscribe();
    }));
  }


  public updateUser(user: User): Observable<User> {
    return this.update<User>(this.path, user.id, this.body(user), mapUser).pipe(tap(_ => {
      this.getAllUsers().subscribe();
    }));
  }


  public deleteUser(id: number): Observable<User> {
    return this.delete<User>(this.path, mapUser, id).pipe(tap(_ => {
      this.getAllUsers().subscribe();
    }));;
  }

}
