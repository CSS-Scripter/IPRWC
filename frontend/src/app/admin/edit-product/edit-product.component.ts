import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  public amount = 1
  public product

  productFormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
  })

  constructor(
    private route: ActivatedRoute, 
    private productService: ProductService,
    private router: Router, 
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getProductFromRoute()
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

  async getProductFromRoute() {
    const id = this.route.snapshot.paramMap.get('id')
    this.product = await this.productService.getProductById(id)
    this.nameFormControl.setValue(this.product.name)
    this.descriptionFormControl.setValue(this.product.description)
    this.priceFormControl.setValue(this.product.price)
    this.imageFormControl.setValue(this.product.image)
  }

  cancel() {
    this.router.navigate(["admin"])
  }

  async submit() {
    if (this.productFormGroup.valid) {
      this.product.name = this.nameFormControl.value
      this.product.description = this.descriptionFormControl.value
      this.product.image = this.imageFormControl.value
      this.product.price = this.priceFormControl.value
      const success = await this.productService.updateProduct(this.product)
      if (success) {
        this._snackBar.open("Product succesfully changed", "ok", {duration: 2000})
        this.router.navigate(["admin"])
      } else {
        this._snackBar.open("Something went wrong. Try again later", "ok", {duration: 2000})
      }
    }
  }
}
