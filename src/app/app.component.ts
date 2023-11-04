import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from './core/services/jwt.service';
import { StorageService } from './core/services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(
    private storageService: StorageService,
    private jwtService: JwtService,
    private router: Router
  ) {
    this.init();
  }

  private async init() {
    this.storageService.get().then(
      res => {
        if (!res) {
          this.router.navigate(['/login'])
        } else {
          this.jwtService.setJwt(res.token);
          console.log(`TOKEN: ${JSON.stringify(res.token)}`);
          this.router.navigate(['/home'])
        }
      }
    ).catch(error => {
      console.log(error)
    });
  }

}
