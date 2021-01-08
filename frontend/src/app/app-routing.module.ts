import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products/products.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: "", component: ProductsComponent  
  },
  {
    path: "register", component: RegisterComponent
  },
  {
    path: "login", component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
