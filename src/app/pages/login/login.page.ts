import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'src/app/core/models/auth.interface';
import { JwtService } from 'src/app/core/services/jwt.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { LoginErrorException, UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public login: FormGroup;
  public errMsg: string = "";

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private jwtService: JwtService,
    private storageService: StorageService,
    private router: Router
  ) {
    this.login = this.fb.group({
      identifier: ['', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  public onSubmit() {
    let obs$ = this.userService.login(this.login.value.identifier, this.login.value.password);
    obs$.subscribe(
      async res => {
        if (res instanceof LoginErrorException) {
          this.errMsg = res.message;
        } else {
          this.jwtService.setJwt((res as Auth).jwt);
          await this.storageService.add((res as Auth).jwt);
          this.router.navigate(['/home'])
        }
      });
  }

}