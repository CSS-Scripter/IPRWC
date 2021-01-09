import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { ApiService } from "./api.service";
import { AuthService } from "./auth.service";

@Injectable({providedIn: "root"})
export class OrderService {

    private orders = {}
    private orders$ = new Subject()

    constructor(private api: ApiService, private auth: AuthService) {
        this.getAllOrders()
        this.auth.getAuth$().subscribe((loggedIn) => {
            if(loggedIn) {
                this.getAllOrders()
            } else {
                this.orders = []
                this.orders$.next([])
            }
        })
    }

    async createOrder(cart) {
        const response = await this.api.post("/orders", cart).toPromise().catch((e) => {
            console.error(e)
            return null
        })
        if (response) {
            this.getAllOrders()
        }
    }

    private async getAllOrders() {
        this.orders = await this.api.get("/orders/me").toPromise().catch((e) => {
            console.error(e)
            return []
        })
        this.orders$.next(this.orders)
    }

    getOrders() {
        return {...this.orders};
    }

    getOrders$() {
        return this.orders$
    }
}