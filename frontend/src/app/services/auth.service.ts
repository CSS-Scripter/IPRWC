import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";

@Injectable({providedIn: "root"})
export class AuthService implements OnInit {
    private token = "";
    private valid = false;

    constructor(private http: HttpClient) {}
    ngOnInit() {
        this.token = localStorage.getItem("JWT_TOKEN");
        this.validateToken();
    }

    public validateToken() {
        if (this.token) {
            // SEND HTTP REQUEST
        } else {
            this.valid = false;
        }
    }

    public isLoggedIn() {
        return this.valid
    }

    public async logIn(email, password) {
        if (email.trim().length > 0 && password.trim.length > 0) {
            const response = await this.http.post("http://localhost:3000/login", {
                body: {}
            })
        }
    }

    public getToken() {
        return this.token
    }
}