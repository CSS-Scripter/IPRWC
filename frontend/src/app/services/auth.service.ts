import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({providedIn: "root"})
export class AuthService {
    private token = "";
    private valid = false;
    private admin = false;

    constructor(private http: HttpClient) {
        this.token = localStorage.getItem("JWT_TOKEN");
        this.validateToken();
    }

    public async validateToken() {
        if (this.token) {
            const response = await this.http.get("http://localhost:3000/check-token", 
                    {headers: {"Authorization": `Bearer ${this.token}`}}).toPromise().catch((err) => {
                        console.error(err)
                    })
            if (response) {
                const responseBody = response['data']
                this.valid = responseBody.valid
                this.admin = responseBody.isAdmin
            } else {
                this.setToken("")
                this.valid = false;
            }
        } else {
            this.setToken("")
            this.valid = false;
        }
    }

    public isLoggedIn() {
        return this.valid;
    }

    public async login(email, password) {
        if (email.trim().length == 0 && password.trim.length == 0) {
            return false;
        }
        const authString = window.btoa(email + ":" + password);
        const response = await this.http.get("http://localhost:3000/login", 
            {headers: {"Authorization": `Basic ${authString}`}}).toPromise().catch((e) => {
                return false
            })
        console.log(response)
        if (response == false) { return false }
        this.setToken(response['data'].token);
        this.valid = true;
        this.admin = response['data'].isAdmin
        return true
    }

    public getToken() {
        return this.token;
    }

    private setToken(token: string) {
        this.token = token;
        localStorage.setItem("JWT_TOKEN", token);
    }

    public logout() {
        this.valid = false;
        this.admin = false;
        this.setToken("");
    }

    public isAdmin() {
        return this.admin
    }
}