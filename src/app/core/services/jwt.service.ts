import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  private _jwt: BehaviorSubject<string> = new BehaviorSubject<string>("");
  public jwt$: Observable<string> = this._jwt.asObservable();

  constructor() { }

  setJwt(jwt: string) {
    this._jwt.next(jwt);
  }

}
