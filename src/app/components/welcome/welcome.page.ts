import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { USERS } from 'src/app/models/users';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  private route = inject(ActivatedRoute)
  id?: number
  nombre?: string

  constructor() { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')
    if (id) {
      this.id = parseInt(id);
      console.log(this.id)
      this.nombre = USERS.find(user => user.id === this.id)?.nombre
    }
  }

}
