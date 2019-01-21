import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Observable, Subscription } from 'rxjs';
import { CategoryService } from '../category.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '../shopping-cart.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnDestroy, OnInit {

  public products: any = [];
  public filteredProducts: Product[] = [];
  public categories$: Observable<any>;
  public subscriber: Subscription;
  public selectedCategory: string;
  public cart: {};

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService
  ) { }

  async ngOnInit() {
    this.subscriber = (await this.shoppingCartService.getCart()).subscribe(
      cart => this.cart = cart
    );
    this.populateProducts();
    this.categories$ = this.categoryService.getAll();
  }

  private applyFilter() {
    this.filteredProducts = (this.selectedCategory) ?
      this.products.filter(product => product.category === this.selectedCategory) : this.products;
  }

  private populateProducts() {
    this.productService.getAllProducts().snapshotChanges().pipe(
      switchMap(
        products => {
          products.forEach((product, index) => {
            this.products.push(product.payload.val());
            this.products[index].key = product.payload.key;
          })
          this.filteredProducts = this.products;

          return this.route.queryParamMap;
        }
      )).subscribe(params => {
        this.selectedCategory = params.get('category');

        this.applyFilter();
      })
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe;
  }

}
