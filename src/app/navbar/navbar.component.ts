import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{

  public collapsed:boolean = true;
  public appUser: AppUser;

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  constructor( private auth: AuthService ) {
    auth.appUser$.subscribe( appUser => this.appUser = appUser );
  }

  logout() {
    this.auth.logout();
  }

}
