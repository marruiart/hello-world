import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthProvider } from './core/services/auth/auth.provider';
import { JwtService } from './core/services/auth/jwt.service';
import { StorageService } from './core/services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(
    private router: Router,
    private authSvc: AuthProvider
  ) {
    this.init();
  }

  private async init() {
    this.authSvc.isLogged$.subscribe({
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
    });
  }

}
