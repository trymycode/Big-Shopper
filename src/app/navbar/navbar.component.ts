import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { ShoppingCartService } from '../shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public collapsed:boolean = true;
  public appUser: AppUser;
  cart$: Observable<ShoppingCart>;
  shoppingCartItemCount: number;
  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  constructor( 
    private auth: AuthService,
    private shoppingCartService: ShoppingCartService 
    ) {
    
  }
  async ngOnInit(){
    this.auth.appUser$.subscribe( appUser => this.appUser = appUser );

    let cart$ = await this.shoppingCartService.getCart();

    cart$.subscribe( cart=> {
      this.shoppingCartItemCount = 0;
      for(let productId in cart.items)
       this.shoppingCartItemCount += cart.items[productId].quantity;
      
    });
  }
  
  logout() {
    this.auth.logout();
  }

}
