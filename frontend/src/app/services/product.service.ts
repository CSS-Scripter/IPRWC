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
        this.products$.next(this.products)
    }

    public getProductObservable(): Subject<any> {
        return this.products$;
    }

    public async getProductById(id) {
        const localProduct = (this.products || []).find((product) => product.id === id)
        if (localProduct) {
            return localProduct
        }
        return await this.api.get(`/products/${id}`).toPromise().catch((e) => {
            console.error(e)
            return null
        })
    }

    public async updateProduct(product) {
        const response = await this.api.put(`/products/${product.id}`, product).toPromise().catch((e) => {
            console.error(e)
            return null
        })
        if (response) {
            this.deleteLocalProduct(product)
            this.products.push(product)
            this.emitProducts()
            return true
        }
        return false
    }

    public async deleteProduct(product) {
        const response = await this.api.delete(`/products/${product.id}`).toPromise().catch((e) => {
            console.error(e)
            return null
        })
        if (response) {
            this.deleteLocalProduct(product)
            this.emitProducts()
            return true
        }
        return false
    }

    private deleteLocalProduct(product) {
        this.products = this.products.filter((p) => p.id != product.id)
    }
}