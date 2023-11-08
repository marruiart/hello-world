import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export abstract class AuthService {

  protected _isLogged = new BehaviorSubject<boolean>(false);
  public isLogged$ = this._isLogged.asObservable();

  public abstract login(credentials: Object): Observable<any>;

  public abstract register<T>(info: T): Observable<T>;

  public abstract logout(): void;

  public abstract me<T>(): Observable<T>;


  /*   public changePassword(oldPasswd: string, newPasswd: string) {
    let passwd = {
      currentPassword: oldPasswd,
      password: newPasswd,
      passwordConfirmation: newPasswd
    }
    return this.httpClient.post<any>(`${environment.API_URL}/api/auth/change-password`, passwd, this._options);
  } */

  /*   abstract changePassword();
  
    abstract forgotPassword(); */

}
