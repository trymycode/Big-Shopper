import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { OrderService } from '../order.service';
import { Subscription } from 'rxjs';
import { Order } from '../models/order';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {

  shipping: any = [];
  subscription: Subscription;
  userId: string;

  @Input() cart: ShoppingCart

  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService
  ) { }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);

    order.items.map(item => {
      item.totalPrice = item.product.price * item.quantity;
    })
    let result = await this.orderService.placeOrder(order, this.cart);
    this.router.navigate(['/order-success', result.key])
  }

  ngOnInit() {
    this.subscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
