import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Auth } from '../../models/auth/auth.interface';
import { UserCredentials } from '../../models/auth/user-credentials.interface';
import { ApiService } from '../api.service';
import { JwtService } from './jwt.service';
import { AuthProvider } from './auth.provider';

@Injectable({
  providedIn: 'root'
})
export class AuthStrapiService extends AuthProvider {

  constructor(
    private apiSvc: ApiService,
    private jwtSvc: JwtService,
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
          next: auth => {
            this.jwtSvc.saveToken(auth.jwt);
            this._isLogged.next(true);
            observer.next();
          },
          error: err => {
            observer.error(err);
          },
          complete: () => {
            observer.complete();
          }
        });
    });
  }

  public register<T>(info: T): Observable<T> {
    throw new Error('Method not implemented.');
  }
  public logout(): void {
    this.jwtSvc.destroyToken();
    this._isLogged.next(false);
  }
  public me<T>(): Observable<T> {
    throw new Error('Method not implemented.');
  }

}
