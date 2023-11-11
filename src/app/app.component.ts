import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthProvider } from './core/services/auth/auth.provider';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnDestroy {
  private _subs: Subscription[] = [];

  constructor(
    private router: Router,
    private authSvc: AuthProvider
  ) {
    this.init();
  }

  private init() {
    this._subs.push(this.authSvc.isLogged$.subscribe({
      next: isLogged => {
        if (isLogged) {
          this.router.navigate(['/home']);
        } else {
          this.router.navigate(['/login']);
        }
      },
      error: err => {
        console.error(err);
      }
    }));
  }

  ngOnDestroy(): void {
    this._subs.forEach(s => s.unsubscribe());
  }

}
