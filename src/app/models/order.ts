import { ShoppingCart } from "./shopping-cart";

export class Order {
	datePlaced: number;
	items: any[];

	constructor(public userId:string, public shipping: any, shoppingCart: ShoppingCart){
		this.datePlaced = new Date().getTime();

		this.items = Object.keys(shoppingCart.items).filter(d => shoppingCart.items[d].quantity !== 0).map(d => shoppingCart.items[d])
	}
}