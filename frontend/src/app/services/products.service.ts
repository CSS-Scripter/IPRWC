import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../models/product.model";
import { ApiService, Ports } from "../public/api.service";

@Injectable({providedIn:"root"})
export class ProductService {

    private products: Map<String, Product>
    private productObservable = new Observable((observer) => {
        this.getProductPromise().then((res) => {
            this.products = res
            observer.next(this.products)
            observer.complete()
        })
    })

    constructor(private api: ApiService) {}

    private async getProductPromise(): Promise<Map<String, Product>> {
        return this.api.get<Map<String, Product>>("/products", Ports.Products).toPromise()
    }

    public getProducts(): Map<String, Product> {
        return this.products;
    }

    public subscribe(observer) {
        this.productObservable.subscribe(observer)
    }

    public createProduct(product: Product) {
        console.log(product)
        this.api.post<Product>("/products", Ports.Products, product).toPromise().then((res) => {
            this.products[res.id] = product
        })
        
    }
}