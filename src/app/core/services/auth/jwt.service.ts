import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';
import { StorageService } from '../storage.service';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  private _jwt: string = "";

  constructor(
    private storageSvc: StorageService
  ) { }

  public saveToken(jwt: string): Observable<string> {
    return this.storageSvc.add(jwt).pipe(tap({
      next: _ => {
        this._jwt = jwt;
      },
      error: err => {
        console.error(err)
      }
    }));
  }

  public loadToken(): Observable<string> {
    return this.storageSvc.get().pipe(tap({
      next: token => {
        this._jwt = token;
      },
      error: err => {
        console.error(err)
      }
    }));
  }

  public getToken() {
    return this._jwt;
  }

  public destroyToken() {
    this._jwt = "";
    return this.storageSvc.add(this._jwt);
  }

}
