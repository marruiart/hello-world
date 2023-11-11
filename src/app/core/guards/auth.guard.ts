import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthProvider } from '../services/auth/auth.provider';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authSvc: AuthProvider,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let url: string = state.url;
    return this.checkLogin(url);
  }

  private checkLogin(url: string): Observable<boolean> {
    return this.authSvc.isLogged$.pipe(tap(isLogged => {
      if (!isLogged) {
        this.router.navigate(['/login']);
      }
    }));
  }

}
