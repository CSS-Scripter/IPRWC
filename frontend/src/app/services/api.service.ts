import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { AuthService } from "./auth.service";
import { JSDocTagName } from "@angular/compiler/src/output/output_ast";

@Injectable({providedIn: "root"})
export class ApiService{

    private host = "http://127.0.0.1:3000"

    constructor(private http: HttpClient, private auth: AuthService) {}

    public get(path: string){
        return this.http.get(`${this.host}${path}`, 
            {
                headers: {
                    "Authorization": `Bearer ${this.auth.getToken()}`
                }
            })
    }

    public post(path: string, body) {
        return this.http.post(`${this.host}${path}`, body, {
            headers: {
                "Authorization": `Bearer ${this.auth.getToken()}`,
                "Content-Type": "application/json"
            }
        })
    }
    
    public put(path: string, body) {
        return this.http.put(`${this.host}${path}`, body, {
            headers: {
                "Authorization": `Bearer ${this.auth.getToken()}`,
                "Content-Type": "application/json"
            }
        })
    }
    
    public delete(path: string) {
        return this.http.delete(`http://localhost:3000${path}`, {
            headers: {
                "Authorization": `Bearer ${this.auth.getToken()}`,
                "Content-Type": "application/json"
            }
        })
    }
}