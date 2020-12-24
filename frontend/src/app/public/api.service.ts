import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class ApiService {

    URL: String = "http://localhost"

    constructor(private http: HttpClient){}

    public get<T>(path: String, port: Ports) : any {
        return this.http.get<T>(`${this.URL}:${port.valueOf()}${path}`);
    }

    public post<T>(path: String, port: Ports, body: T): any {
        return this.http.post<T>(`${this.URL}:${port.valueOf()}${path}`, body);
    }
    
}

export enum Ports {
    Products = 4000,
    Orders = 4001
}