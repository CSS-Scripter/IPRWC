import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { ShopItemComponent } from './shop-item/shop-item.component';
import { KeysPipe } from './pipes/keys.pipe';

const components = [
    HeaderComponent,
    ShopItemComponent,
    KeysPipe
]

@NgModule({
  declarations: components,
  imports: [],
  providers: [],
  exports: components
})
export class SharedModule { }
