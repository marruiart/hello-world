import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/components/home/models/user.interface';
import { UsersService } from 'src/app/services/users.service';
import { UserInfoFavClicked } from '../user-info/user-info-fav-clicked.interface';

@Component({
  selector: 'app-fav-info',
  templateUrl: './fav-info.component.html',
  styleUrls: ['./fav-info.component.scss'],
})
export class FavInfoComponent implements OnInit {
  @Input() id!: number;
  public user!: User;
  @Output() onFavRemoved: EventEmitter<UserInfoFavClicked> = new EventEmitter<UserInfoFavClicked>();

  constructor(private users: UsersService) { }

  ngOnInit() {
    this.users.getUser(this.id).subscribe(res => this.user = res);
  }

  removeFav(event: any) {
    this.onFavRemoved.emit({
      fav: false
    });
    event.stopPropagation();
  }

}
