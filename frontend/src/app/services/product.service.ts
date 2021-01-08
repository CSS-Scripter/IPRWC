import { Injectable } from "@angular/core";
import { of, Subject } from "rxjs";
import { ApiService } from "./api.service";

@Injectable({providedIn: "root"})
export class ProductService{

    private products;
    private products$ = new Subject()

    constructor(private api: ApiService) {
        this.setupProducts()
    }

    private async setupProducts() {
        const resp = await this.api.get("/products").toPromise().catch((err) => {console.error(err)})
        this.products = resp
        this.emitProducts();
    }

    public getProducts() {
        return this.products;
    }

    private emitProducts() {
        console.log("Emitting", this.products)
        this.products$.next(this.products)
    }

    public getProductObservable(): Subject<any> {
        return this.products$;
    }

    public getProductById(id) {
        return this.products.find((product) => product.id === id)
    }
}