import { Component, OnInit, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../models/user';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  @Input()
  user: User = {
    id: 0,
    nombre: "",
    apellidos: "",
    edad: 0
  }

  constructor(private router: Router) { }

  ngOnInit() { }

}
