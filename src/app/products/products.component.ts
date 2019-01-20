import { CategoryService } from './../category.service';
import { ProductServiceService } from './../product-service.service';
import { Component, OnDestroy, OnInit} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnDestroy, OnInit{ 
  public products: any = [];
  public filteredProducts: Product[] = [];
  public categories: any = [];
  public subscriber1: Subscription;
  public subscriber2: Subscription;
  public selectedCategory: string;
  public cart: {};
  constructor( 
    private productService: ProductServiceService, private categoryService:CategoryService,
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService){

     productService.getAllProducts().snapshotChanges().pipe(
      switchMap(
        products => {
          products.forEach((product, index) => {
            this.products.push(product.payload.val());
            this.products[index].key = product.payload.key;
          })
          this.filteredProducts = this.products;

          return route.queryParamMap;
        }
      )).subscribe(params => {
        this.selectedCategory = params.get('category');

        this.filteredProducts = (this.selectedCategory) ?
          this.products.filter(product => product.category === this.selectedCategory) : this.products;
      })

    this.subscriber1 = categoryService.getAll().subscribe(
      data => this.categories = data
    );
  }

  async ngOnInit() {
    this.subscriber2 = (await this.shoppingCartService.getCart()).subscribe(
      cart => this.cart = cart
    );
  }

  ngOnDestroy() {
    this.subscriber1.unsubscribe;
    this.subscriber2.unsubscribe;
  }
 
}
