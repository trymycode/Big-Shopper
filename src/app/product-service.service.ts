import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor( private db: AngularFireDatabase ) { }
  createProduct(product){
    return this.db.list('/products').push(product);
  }
  getAllProducts() {
    return this.db.list('/products');
  }
  getProduct(id){
    return this.db.object('/products/'+ id)
    .valueChanges();
  }
  updateProduct(id, product) {
    return this.db.object('/products/'+id).update(product);
  }
  deleteProduct(id){
    return this.db.object('/products/'+ id).remove();
  }
}
