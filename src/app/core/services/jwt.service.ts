import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  private _jwt: string = "";

  constructor(
    private storageSvc: StorageService
  ) { }

  public saveToken(jwt: string) {
    this._jwt = jwt;
    this.storageSvc.add(jwt)
      .catch(error => {
        console.error(error);
      });
  }

  public loadToken() {
    return new Observable<string>(observer => {
      this.storageSvc.get().then(
        res => {
          if (res && res.token != '') {
            this._jwt = res.token;
            console.log(`TOKEN: ${JSON.stringify(res.token)}`);
            observer.next(this._jwt);
            observer.complete();
          }
        }
      ).catch(error => {
        observer.error(error);
        observer.complete();
      });
    });
  }

  public getToken() {
    return this._jwt;
  }

  public destroyToken() {
    this._jwt = "";
    return this.saveToken(this._jwt);
  }

}
