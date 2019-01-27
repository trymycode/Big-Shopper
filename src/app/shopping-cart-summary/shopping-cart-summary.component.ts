import { Component, Input } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';
// import { KeyRegistry } from '@angular/core/src/di/reflective_key';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent {
  @Input() cart: ShoppingCart;

  keys: Array<string> = [];

  populateList() {
    if(this.cart.items) {
      this.keys = Object.keys(this.cart.items).filter(key => this.cart.items[key].quantity !== 0);
    }
  }

}
