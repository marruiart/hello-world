import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthProvider } from './core/services/auth/auth.provider';
import { CustomTranslateService } from './core/services/custom-translate.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public language = "es";

  constructor(
    private router: Router,
    private authSvc: AuthProvider,
    public translate: CustomTranslateService
  ) {
    this.init();
  }

  private async init() {
    this.translate.changeLanguage('es');
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

  public onTranslate() {
    if (this.language == 'es') {
      this.language = 'en';
    } else {
      this.language = 'es';
    }
    this.translate.changeLanguage(this.language).subscribe(); // TODO cambiar esto con promesas
  }

}
