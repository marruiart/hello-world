import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserInfoFavClicked } from '../models/user-info-fav-clicked';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit, AfterViewInit {
  @Input() user: User | null = null;
  @Output() onFavClicked: EventEmitter<UserInfoFavClicked> = new EventEmitter<UserInfoFavClicked>();

  constructor(private router: Router) { }
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit() { }

  onFavClick(event: any) {
    this.onFavClicked.emit({
      fav: !(this.user?.fav ?? false)
    });
    event.stopPropagation();
  }

  welcome() {
    this.router.navigate(["/welcome"]);
  }

}
