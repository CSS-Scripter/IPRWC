import { Component } from '@angular/core';
import { ApiService, Ports } from './public/api.service';
import { Product } from './models/product.model';
import { ProductService } from './services/products.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  loading = true
  products = {} as Map<String, Product>
  productObserver = {
    next: val => {
      this.products = val
      this.loading = false
    },
    error: err => console.error(err),
  }

  constructor(private productService: ProductService) {
    this.productService.subscribe(this.productObserver)
  }
}
