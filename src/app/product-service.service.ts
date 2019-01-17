import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor( private db: AngularFireDatabase ) { }
  create(product){
    this.db.list('/products').push(product);
  }
  getAllProducts() {
    return this.db.list('/products');
  }
}
