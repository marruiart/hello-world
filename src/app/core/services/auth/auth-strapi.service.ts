import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Auth } from '../../models/auth/auth.interface';
import { UserCredentials } from '../../models/auth/user-credentials.interface';
import { ApiService } from '../api.service';
import { JwtService } from './jwt.service';
import { AuthProvider } from './auth.provider';
import { UserRegister } from '../../models/auth/user-register.interface';
import { UsersService } from '../users.service';
import { lastValueFrom } from 'rxjs';
import { NewUser } from '../../models/user.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthStrapiService extends AuthProvider {
  private userSvc = inject(UsersService);

  constructor(
    private apiSvc: ApiService,
    private jwtSvc: JwtService,
    private router: Router
  ) {
    super();
    this.init();
  }

  private init() {
    this.jwtSvc.loadToken().subscribe(_ => {
      this._isLogged.next(true);
    });
  }

  public login(credentials: UserCredentials): Observable<void> {
    const body: any = {
      "identifier": credentials.username,
      "password": credentials.password
    }
    return new Observable<void>(observer => {
      this.apiSvc.post<Auth>("/api/auth/local", body)
        .subscribe({
          next: async auth => {
            await lastValueFrom(this.jwtSvc.saveToken(auth.jwt))
              .catch(err => {
                observer.error(err);
              });
            this._isLogged.next(true);
            observer.next();
            observer.complete();
          },
          error: err => {
            observer.error(err);
          }
        });
    });
  }

  public register(info: UserRegister): Observable<void> {
    const body: UserRegister = {
      "username": info.username,
      "email": info.username,
      "password": info.password
    }

    return new Observable<void>(observer => {
      this.apiSvc.post<Auth>("/api/auth/local/register", body)
        .subscribe({
          next: async auth => {
            // Save token in local storage
            await lastValueFrom(this.jwtSvc.saveToken(auth.jwt))
              .catch(err => {
                observer.error(err)
              });
            const nickname = auth.user.username.slice(0, auth.user.username.indexOf("@"));
            const user: NewUser = {
              "user_id": auth.user.id,
              "nickname": nickname
            }
            this._isLogged.next(true);

            await lastValueFrom(this.userSvc.addUser(user))
              .catch(err => {
                observer.error(err)
              });
            observer.next();
            observer.complete();
          },
          error: err => {
            observer.error(err);
          }
        });
    });
  }

  public logout(): void {
    lastValueFrom(this.jwtSvc.destroyToken())
      .then(_ => {
        this._isLogged.next(false);
        this.router.navigate(['/login']);
      })
      .catch(err => {
        console.error(err);
      });
  }

  public me<T>(): Observable<T> {
    throw new Error('Method not implemented.');
  }

}
