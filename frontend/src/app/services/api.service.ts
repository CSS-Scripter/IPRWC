import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { AuthService } from "./auth.service";

@Injectable({providedIn: "root"})
export class ApiService{
    constructor(private http: HttpClient, private auth: AuthService) {}

    public get<T>(url: string){
        return this.http.get<T>(url, 
            {
                withCredentials: true, 
                headers: {
                    "Authorization": `Bearer ${this.auth.getToken()}`
                }
            })
    }
}