import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerFormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    name: new FormControl('', [
      Validators.required,
    ]),
    password: new FormControl('', [
      Validators.required,
    ]),    
    repeatPassword: new FormControl('', []),
    street: new FormControl('', [
      Validators.required,
    ]),
    postal: new FormControl('', [
      Validators.required,
    ]),
    city: new FormControl('', [
      Validators.required,
    ]),
    housenumber: new FormControl('', [
      Validators.required,
    ])
  })

  registerSucces = true
  repeatPassword = true

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  checkPasswords() {
    const pass = this.registerFormGroup.get('password').value;
    const repeatPass = this.registerFormGroup.get('repeatPassword').value;
    this.repeatPassword = pass === repeatPass
    return this.repeatPassword;
  }

  get nameFormControl() {
    return this.registerFormGroup.get('name')
  }
  get emailFormControl() {
    return this.registerFormGroup.get('email')
  }
  get passwordFormControl() {
    return this.registerFormGroup.get('password')
  }
  get streetFormControl() {
    return this.registerFormGroup.get('street')
  }
  get housenumberFormControl() {
    return this.registerFormGroup.get('housenumber')
  }
  get postalFormControl() {
    return this.registerFormGroup.get('postal')
  }
  get cityFormControl() {
    return this.registerFormGroup.get('city')
  }

  async submit() {
    if (this.registerFormGroup.valid) {
      if (this.checkPasswords()) {
        const user = new User()
        user.name = this.nameFormControl.value
        user.email = this.emailFormControl.value
        user.password = this.passwordFormControl.value
        user.housenumber = this.housenumberFormControl.value
        user.street = this.streetFormControl.value
        user.postal = this.postalFormControl.value
        user.city = this.cityFormControl.value
        console.log(JSON.stringify(user))
        this.auth.register(user)
      }
    }
  }

  clearForm() {
    this.registerFormGroup.get('email').setValue('')
    this.registerFormGroup.get('password').setValue('')
  }
}
