import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Subject } from "rxjs";
import { User } from "../models/user.model";

@Injectable({providedIn: "root"})
export class AuthService {
    private token = "";
    private valid = false;
    private admin = false;
    private auth$ = new Subject()

    constructor(private http: HttpClient, private _snackBar: MatSnackBar) {
        this.token = localStorage.getItem("JWT_TOKEN");
        this.validateToken();
    }

    public async validateToken() {
        if (this.token) {
            const response = await this.http.get("http://127.0.0.1:3000/check-token", 
                    {headers: {"Authorization": `Bearer ${this.token}`}}).toPromise().catch((err) => {
                        console.error(err)
                    })
            if (response) {
                const responseBody = response['data']
                this.valid = responseBody.valid
                this.admin = responseBody.isAdmin
                this.auth$.next(true)
            } else {
                this.setToken("")
                this.valid = false;
                this.admin = false;
                this.openSnackBar("Looks like your session has expired. Please log back in.", "Close")
            }
        } else {
            this.setToken("")
            this.valid = false;
            this.admin = false;
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
        const response = await this.http.get("http://127.0.0.1:3000/login", 
            {headers: {"Authorization": `Basic ${authString}`}}).toPromise().catch((e) => {
                console.error(e)
                return false
            })
        if (response == false) { return false }
            this.setToken(response['data'].token);
            this.valid = true;
            this.admin = response['data'].isAdmin
            this.auth$.next(true)
        return true
    }

    public async register(user: User) {
        const response = await this.http.post("http://127.0.0.1:3000/register", user).toPromise().catch((e) => {
            console.error(e)
            return null
        })
        if (response) {
            this.setToken(response['data'].token)
            this.valid = true;
            this.admin = false;
            this.auth$.next(true)
        }
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
        this.auth$.next(false)
    }

    public isAdmin() {
        return this.admin
    }
    
    private openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {
          duration: 10000,
        });
    }

    getAuth$() {
        return this.auth$
    }
}