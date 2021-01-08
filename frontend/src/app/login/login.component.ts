import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
    ])
  })

  loginSucces = true

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  get emailFormControl() {
    return this.loginFormGroup.get('email')
  }
  get passwordFormControl() {
    return this.loginFormGroup.get('password')
  }

  async submit() {
    if (this.loginFormGroup.valid) {
      const email = this.loginFormGroup.get("email").value.toLowerCase()
      const password = this.loginFormGroup.get("password").value
      this.loginSucces = await this.auth.login(email, password) || false
      if (this.loginSucces) {
        this.router.navigate([""])
      }
    }
  }

  clearForm() {
    this.loginFormGroup.get('email').setValue('')
    this.loginFormGroup.get('password').setValue('')
  }

}
