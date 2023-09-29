import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/components/home/models/user';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  _users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  users$: Observable<User[]> = this._users.asObservable();

  constructor(private router: Router) { }

  ngOnInit(): void {
    let index = 0;
    let usersData: User[] = [
      { id: 1, name: "Juan A.", surname: "García Gómez", age: 46 },
      { id: 2, name: "María del Mar", surname: "Valencia Valencia", age: 46 },
      { id: 3, name: "Alejandro", surname: "García Gómez", age: 45 },
      { id: 4, name: "Juan", surname: "García Valencia", age: 4 },
      { id: 5, name: "Lydia", surname: "García Robles", age: 11 }
    ];

    // Cada segundo mete un usuario nuevo en un array
    setInterval(() => {
      if (index < usersData.length) {
        let users = this._users.value;
        users.push(usersData[index]);
        this._users.next(users);
        index++;
      }
    }, 500);
  }

  welcome() {
    this.router.navigate(["/welcome"]);
  }
}
