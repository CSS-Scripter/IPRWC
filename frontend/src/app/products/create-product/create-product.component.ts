import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product.model';
import { ProductService } from '../../services/products.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent {

  productForm;

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder) {
      this.productForm = this.formBuilder.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        price: [0, Validators.required],
      })
    }
  
  onSubmit(data) {
    if (this.productForm.valid) {
      const product = new Product()
      product.title = data.title
      product.description = data.description
      product.price = data.price
      this.productService.createProduct(product)
    } else {
      console.log("Invalid")
    }
  }

}
