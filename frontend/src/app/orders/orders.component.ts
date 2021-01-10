import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders = []

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orders = this.parseOrders(this.orderService.getOrders())
    this.orderService.getOrders$().subscribe((orders) => {
      this.orders = this.parseOrders(orders)
    })
  }

  parseOrders(orders) {
    const orderArray = []
    for(let id in orders) {
      orderArray.push({id, ...orders[id]})
    }
    return orderArray
  }

  calculateTotalOfOrder(order) {
    let total = 0;
    for(let product of order.products) {
      total += (product.price * product.amount)
    }
    return total
  }

}
