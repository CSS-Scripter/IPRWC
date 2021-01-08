import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { AuthService } from "./auth.service";

@Injectable({providedIn: "root"})
export class ApiService{
    constructor(private http: HttpClient, private auth: AuthService) {}

    public get(path: string){
        return this.http.get(`http://localhost:3000${path}`, 
            {
                headers: {
                    "Authorization": `Bearer ${this.auth.getToken()}`
                }
            })
    }
}