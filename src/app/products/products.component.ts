import { CategoryService } from './../category.service';
import { ProductServiceService } from './../product-service.service';
import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  public products: any = [];
  public filteredProducts: any = [];
  public categories: any = [];
  public subscriber: Subscription;
  public selectedCategory: string;
  constructor( 
    productService: ProductServiceService, categoryService:CategoryService,
    private route: ActivatedRoute){
    productService.getAllProducts().valueChanges().pipe(
      switchMap(
        products => {
          this.filteredProducts = this.products = products;
          return route.queryParamMap;
        }
      )).subscribe(params => {
        this.selectedCategory = params.get('category');

        this.filteredProducts = (this.selectedCategory) ?
          this.products.filter(product => product.category === this.selectedCategory) : this.products;
      })

    this.subscriber = categoryService.getAll().subscribe(
      data => this.categories = data
    );
  }
  // ngOnDestroy() {
  //   this.subscriber.unsubscribe;
  // }
 
}
