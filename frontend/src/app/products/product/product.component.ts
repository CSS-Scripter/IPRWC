import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public amount = 1
  public product

  constructor(
    private route: ActivatedRoute, 
    private productService: ProductService, 
    private _snackBar: MatSnackBar,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.getProductFromRoute()
  }

  async getProductFromRoute() {
    const id = this.route.snapshot.paramMap.get('id')
    this.product = await this.productService.getProductById(id)
  }

  addProductToCart() {
    this.cartService.addItemToCart(this.product, this.amount)
    this._snackBar.open("Product added to cart", "", {duration: 2000})
  }

}
