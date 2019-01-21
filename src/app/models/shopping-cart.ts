import { ShoppingCartItem } from "./shopping-cart-item";

export class ShoppingCart {

	constructor(public items: ShoppingCartItem[]) { }

	get productIds() {
		return Object.keys(this.items);
	}

	get totalItemsCount() {
		let count = 0;
		for (let productId in this.items) {
			count += this.items[productId].quantity;
		}
		return count;
	}

	get totalPrice() {
		let sum = 0;
		for (let productId in this.items) {
			sum += this.items[productId].quantity * this.items[productId].product.price;
		}
		return sum;
	}
}