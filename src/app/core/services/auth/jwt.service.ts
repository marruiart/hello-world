import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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
    return new Observable<string>(observer => {
      this.storageSvc.add(jwt)
        .then(_ => {
          this._jwt = jwt;
          observer.next(jwt);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    })
  }

  public loadToken() {
    return new Observable<string>(observer => {
      this.storageSvc.get()
        .then(res => {
          if (res && res.token != '') {
            this._jwt = res.token;
            observer.next(this._jwt);
            observer.complete();
          }
        }
        ).catch(error => {
          observer.error(error);
        });
    });
  }

  public getToken() {
    return this._jwt;
  }

  public destroyToken() {
    this._jwt = "";
    return this.storageSvc.loginAuth.delete(0);
  }

}
