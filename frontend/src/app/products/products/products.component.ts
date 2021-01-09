import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  
  public products = []

  constructor(private cartService: CartService, private productService: ProductService, private router: Router) {
    this.productService.getProductObservable().subscribe({
      next: (data) => {this.products = data}
    })
  }

  ngOnInit(): void {
    this.products = this.productService.getProducts()
  }

  navigateToProductPage(product) {
    console.log(product.id)
    this.router.navigate(["products", product.id], {state: {product}})
  }

  addProductToCart(product) {
    this.cartService.addItemToCart(product, 1)
  }
}
