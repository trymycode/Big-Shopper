import { ProductServiceService } from './../product-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent  {
  products$;
  constructor( productService: ProductServiceService ) {
   this.products$= productService.getAllProducts().valueChanges();
   }
 

}
