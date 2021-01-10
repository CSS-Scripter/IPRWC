import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public products = []

  constructor(private productService: ProductService, private router: Router, private _snackBar: MatSnackBar) {
    this.productService.getProductObservable().subscribe({
      next: (data) => {this.products = data}
    })
  }

  ngOnInit(): void {
    this.products = this.productService.getProducts()
  }

  editProduct(product) {
    this.router.navigate(["admin", "products", product.id], {state: {product}})
  }

  async deleteProduct(product) {
    const success = await this.productService.deleteProduct(product)
    if (success) {
      this._snackBar.open("Product succesfully deleted", "ok", {duration: 2000})
    } else {
      this._snackBar.open("Something went wrong, please try again later", "ok", {duration: 2000})
    }
  }
}
