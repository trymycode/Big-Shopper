import { ProductServiceService } from './../../product-service.service';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy {
  public products: any[] = [];
  public filteredProducts: any[];
  public subscriber: Subscription;
  constructor( private productService:ProductServiceService) {
    this.productService.getAllProducts()
    .snapshotChanges().subscribe(
      data => data.forEach((element, index)=>{
      this.products.push(element.payload.val());
      this.products[index].key = element.key;
      this.filteredProducts = this.products;
      })
    )
   }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }

}
