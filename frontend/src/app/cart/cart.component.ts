import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class CartComponent implements OnInit {

  constructor(private cartService: CartService, private auth: AuthService) { }

  ngOnInit(): void {
  }

  getCart() {
    return this.cartService.getCart()
  }

  decreaseAmount(product) {
    this.cartService.changeQuantity(product, --product.amount)
  }
  
  increaseAmount(product) {
    this.cartService.changeQuantity(product, ++product.amount)
  }

  isLoggedIn() {
    return this.auth.isLoggedIn()
  }

  createOrder() {
    this.cartService.createOrder()
  }

}
