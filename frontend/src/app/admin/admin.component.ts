import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  public product

  productFormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
  })

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

  get nameFormControl() {
    return this.productFormGroup.get('name')
  }
  get descriptionFormControl() {
    return this.productFormGroup.get('description')
  }
  get priceFormControl() {
    return this.productFormGroup.get('price')
  }
  get imageFormControl() {
    return this.productFormGroup.get('image')
  }

  async createProduct() {
    if (this.productFormGroup.valid) {
      this.product = {}
      this.product.name = this.nameFormControl.value
      this.product.description = this.descriptionFormControl.value
      this.product.image = this.imageFormControl.value
      this.product.price = this.priceFormControl.value
      const success = await this.productService.createProduct(this.product)
      if (success) {
        this._snackBar.open("Product succesfully created", "ok", {duration: 2000})
      } else {
        this._snackBar.open("Something went wrong. Try again later", "ok", {duration: 2000})
      }
    }
  }

  clear() {
    this.nameFormControl.setValue("")
    this.descriptionFormControl.setValue("")
    this.imageFormControl.setValue("")
    this.priceFormControl.setValue(0)
  }
}
