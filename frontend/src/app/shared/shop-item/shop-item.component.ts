import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.scss']
})
export class ShopItemComponent {
  @Input() imageSrc: string = "";
  @Input() title: string = "";
  @Input() description: string = "";
  @Input() price: string = "";
}
