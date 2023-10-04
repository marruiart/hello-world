import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../models/user.interface';
import { UserInfoFavClicked } from './user-info-fav-clicked.interface';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  @Input() user: User | null = null;

  @Output() onFavClicked: EventEmitter<UserInfoFavClicked> = new EventEmitter<UserInfoFavClicked>();
  // Emitir @Output() onCardClicked para evitar el manejo de router navigation en el componente hijo
  @Output() onCardClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() onDeleteClicked: EventEmitter<void> = new EventEmitter<void>;

  constructor(private router: Router) { }

  ngOnInit() { }

  onFavClick(event: any) {
    this.onFavClicked.emit({
      fav: !(this.user?.fav ?? false)
    });
    event.stopPropagation();
  }

  onDeleteClick(event: any) {
    this.onDeleteClicked.emit();
    event.stopPropagation();
  }

  welcome() {
    this.router.navigate(["/welcome"]);
  }

}
