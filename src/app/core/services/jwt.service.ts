import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  private _jwt: BehaviorSubject<string> = new BehaviorSubject<string>("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjk5MDM1NjY1LCJleHAiOjE3MDE2Mjc2NjV9.5jZB4zTK6T4SrWDmJwsZ0KUKB-elVf6HZrusLgYrfaU");
  public jwt$: Observable<string> = this._jwt.asObservable();

  constructor() { }

  setJwt(jwt: string) {
    this._jwt.next(jwt);
  }

}
