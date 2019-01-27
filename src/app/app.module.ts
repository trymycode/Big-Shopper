import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire'
import { AngularFireDatabaseModule } from '@angular/fire/database'
import { AngularFireAuthModule } from '@angular/fire/auth';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { RouterModule } from '@angular/router';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import {DataTableModule} from "angular-6-datatable";

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { routingComponents, AppRoutingModule } from './app-routing.module';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    routingComponents,
    ProductFormComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    ShippingFormComponent,
    ShoppingCartSummaryComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    CustomFormsModule,
    DataTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
