import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PublicModule } from './public/public.module';
import { SharedModule } from './shared/shared.module';
import { ProductsModule } from './products/products.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PublicModule,
    SharedModule,
    ProductsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
