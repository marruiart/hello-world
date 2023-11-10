import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserCredentials } from 'src/app/core/models/auth/user-credentials.interface';
import { AuthProvider } from 'src/app/core/services/auth/auth.provider';

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
    private authSvc: AuthProvider,
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

  public onLogin() {
    const credentials: UserCredentials = {
      username: this.login.value.identifier,
      password: this.login.value.password
    }
    this.authSvc.login(credentials).subscribe({
      next: _ => {
        this.router.navigate(['/home']);
      },
      error: err => {
        console.error(err);
      }
    });
  }

  public onCreateAccount() {
    this.router.navigate(['/register']);
  }

}