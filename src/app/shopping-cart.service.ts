import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { take, map } from 'rxjs/operators';
import { Product } from './models/product';
import { Observable } from 'rxjs';
import { ShoppingCart } from './models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    })
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object<ShoppingCart>('/shopping-carts/' + cartId).valueChanges().pipe(
      map( data => new ShoppingCart(data.items))
    );
  }

  private getItem(cartId:string, productId: string) {
    return this.db.object('/shopping-carts/'+ cartId +'/items/'+productId);
  }

  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;
   
    let result = await this.create()
    localStorage.setItem('cartId', result.key)
    return result.key;
  }

  async addToCart(product: Product) {
    this.updateItemQuantity(product,1);
  }

  async removeFromCart(product: Product) {
    this.updateItemQuantity(product,-1);
  }

  private async updateItemQuantity(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let items$: AngularFireObject<any> = this.getItem(cartId, product.key);
    return items$.valueChanges().pipe(
      take(1)
    ).subscribe(item => {
      if (item) items$.update({ quantity: item.quantity + change});
      else items$.set({ product: product, quantity: 1});
    })
  }
}
