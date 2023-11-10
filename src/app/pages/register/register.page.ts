import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserCredentials } from 'src/app/core/models/auth/user-credentials.interface';
import { AuthProvider } from 'src/app/core/services/auth/auth.provider';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public register: FormGroup;
  public errMsg: string = "";

  constructor(
    private fb: FormBuilder,
    private authSvc: AuthProvider,
    private router: Router
  ) {
    this.register = this.fb.group({
      identifier: ['', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]],
      password: ['', Validators.required],
      passwordRepeat: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  public onRegister() {
    const credentials: UserCredentials = {
      username: this.register.value.identifier,
      password: this.register.value.password
    }
    this.authSvc.register(credentials).subscribe({
      next: _ => {
        this.router.navigate(['/home']);
      },
      error: err => {
        console.error(err);
      }
    });
  }
}
