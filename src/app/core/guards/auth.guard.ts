import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authSvc: AuthService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let url: string = state.url;
    console.log(route);
    return this.checkLogin(url);
  }

  private checkLogin(url: string): Observable<boolean> {
    let obs = this.authSvc.isLogged$.pipe(tap(isLogged => {
      if (!isLogged) {
        this.router.navigate(['/login']);
      }
    }));
    return obs;
  }

}
