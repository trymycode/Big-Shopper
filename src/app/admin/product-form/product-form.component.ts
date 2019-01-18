import { ProductServiceService } from './../../product-service.service';
import { CategoryService } from './../../category.service';
import { Component} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  public id: string;
  public product:any = [];
  public subscriber: Subscription;
  categories$;
  constructor( 
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService, 
    private productService:ProductServiceService
    )
    { 
     this.categories$ =  categoryService.getCategories();

     this.id = this.route.snapshot.paramMap.get('id');
     if(this.id) this.productService.getProduct(this.id).pipe(
       take(1)
     ).subscribe(
       data => {
         this.product = data
       }
     )
    }

  save(product){
    this.productService.createProduct(product);
    this.router.navigate(['/admin/products']);
    if(this.id) this.productService.updateProduct(this.id, product );
    else this.productService.createProduct(product);
    this.router.navigate(['/admin/products']);
  }
 

}
