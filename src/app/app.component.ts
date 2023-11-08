import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/services/auth/auth.service';
import { JwtService } from './core/services/jwt.service';
import { StorageService } from './core/services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(
    private router: Router,
    private authSvc: AuthService
  ) {
    this.init();
  }

  private async init() {
    this.authSvc.isLogged$.subscribe({
      next: isLogged => {
        if (isLogged) {
          this.router.navigate(['/home']);
        }
      },
      error: err => {
        console.error(err);
      }
    });
  }

}
