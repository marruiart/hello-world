import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { USERS } from '../../models/users'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  users = USERS

  constructor(private router: Router) { }

  welcome() {
    this.router.navigate(["/welcome"]);
  }
}
