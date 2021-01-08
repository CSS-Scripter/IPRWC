import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  constructor(private auth: AuthService) {}
  
  ngOnInit(): void {
  }

  login() {
    this.auth.login("Hi@mylocalhost.app", "Pass")
  }

  isLoggedIn() {
    return this.auth.isLoggedIn()
  }

  logout() {
    this.auth.logout()
  }

  isAdmin() {
    return this.auth.isAdmin()
  }

}
