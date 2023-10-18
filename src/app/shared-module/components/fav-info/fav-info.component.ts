import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/core/models/user.interface';
import { UsersService } from 'src/app/core/services/users.service';
import { UserInfoFavClicked } from '../user-info/user-info-fav-clicked.interface';

@Component({
  selector: 'app-fav-info',
  templateUrl: './fav-info.component.html',
  styleUrls: ['./fav-info.component.scss'],
})
export class FavInfoComponent implements OnInit {
  public user: User | null;
  private _id: number = 0;
  @Input() set id(newId: number) {
    this._id = newId;
    if (this._id != 0) {
      this.users.getUser(this._id).subscribe({
        next: res => {
          this.user = res;
        },
        error: err => {
          console.error(err);
        }
      });
    }
  }
  get id(): number {
    return this._id;
  }
  @Output() onFavRemoved: EventEmitter<UserInfoFavClicked> = new EventEmitter<UserInfoFavClicked>();

  constructor(private users: UsersService) {
    this.user = null;
  }

  ngOnInit() { }

  removeFav(event: any) {
    this.onFavRemoved.emit({
      fav: false
    });
    event.stopPropagation();
  }

}
