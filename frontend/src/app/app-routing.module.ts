import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products/products.component';
import { ProductComponent } from './products/product/product.component';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';
import { OrdersComponent } from './orders/orders.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuardService } from './services/authGuard.service';
import { EditProductComponent } from './admin/edit-product/edit-product.component';

const routes: Routes = [
  {
    path: "", component: ProductsComponent  
  },
  {
    path: "products/:id", component: ProductComponent  
  },
  {
    path: "register", component: RegisterComponent
  },
  {
    path: "login", component: LoginComponent
  },
  {
    path: "cart", component: CartComponent
  },
  {
    path: "orders", component: OrdersComponent
  },
  {
    path: "admin", component: AdminComponent, canActivate: [AuthGuardService]
  },
  {
    path: "admin/products/:id", component: EditProductComponent, canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
