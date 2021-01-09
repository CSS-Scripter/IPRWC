import { ThisReceiver } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { OrderService } from "./order.service";

@Injectable({providedIn: "root"})
export class CartService {

    // CURRENT STRUCT
    // [{product: {}, amount: num}]

    // NEW STRUCT
    // [{...product, amount: num}]
    private cart

    constructor(private orderService: OrderService) {
        this.cart = []
        this.readFromStorage()
    }

    addItemToCart(product, amount) {
        const foundProduct = this.cart.find((entry) => entry.id == product.id)
        if (foundProduct) {
            foundProduct.amount += amount
        } else {
            this.cart.push({...product, amount})
        }
        this.writeToStorage()
    }

    removeItemFromCart(product) {
        this.cart = this.cart.filter((entry) => entry.id != product.id)
        this.writeToStorage()
    }

    changeQuantity(product, newAmount) {
        if (newAmount <= 0) {
            this.removeItemFromCart(product)
        } else {
            this.cart.find((entry) => entry.id === product.id).amount = newAmount
        }
        this.writeToStorage()
    }

    clearCart() {
        this.cart = []
        this.writeToStorage()
    }

    getCart() {
        return [...this.cart]
    }

    private writeToStorage() {
        console.log(this.cart)
        localStorage.setItem("CART", JSON.stringify(this.cart))
    }

    private readFromStorage() {
        this.cart = JSON.parse(localStorage.getItem("CART")) || []
    }

    createOrder() {
        this.orderService.createOrder([...this.cart])
    }
}