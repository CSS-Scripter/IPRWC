import { NgModule } from "@angular/core";
import { PublicModule } from "../public/public.module";
import { CreateProductComponent } from "./create-product/create-product.component";

const components = [CreateProductComponent]

@NgModule({
    imports: [PublicModule],
    exports: components,
    declarations: components,
    providers: []
})
export class ProductsModule{}