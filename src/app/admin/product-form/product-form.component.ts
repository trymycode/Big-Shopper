import { Component, OnDestroy } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnDestroy {

  public categories;
  public product:any = [];
  public id: string;
  public subscriber: Subscription;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    this.subscriber = categoryService.getAll().subscribe(
      data => this.categories = data
    );

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.getProduct(this.id).pipe(
        take(1)
      ).subscribe(data => {
        this.product = data;
      })
    }
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }

  delete() {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(this.id);
      this.router.navigate(['/admin/products']);
    }
  }

  save(product) {
    (this.id) ? this.productService.updateProduct(this.id, product) : this.productService.createProduct(product);
    this.router.navigate(['/admin/products']);
  }

}
