import { Component, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { DatabaseSnapshot, AngularFireAction } from '@angular/fire/database';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy {

  public products: any[] = [];
  public filteredProducts: Product[];
  public subscriber: Subscription;

  constructor(private productService: ProductService) {

    this.subscriber = productService.getAllProducts().snapshotChanges().subscribe(
      products => {
        products.forEach((product, index) => {
          this.products.push(product.payload.val());
          this.products[index].key = product.key;
        });
        this.filteredProducts = this.products;
      }
    );
  }

  filter(query: string) {
    this.filteredProducts = (query) ? this.products.filter(product => product.title.toLowerCase().includes(query.toLowerCase())) : this.products;
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }

}
