import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user$: Observable<firebase.User>;
  constructor( private afAuth: AngularFireAuth ){
    this.user$ = afAuth.authState;
  }
  logout(){
    this.afAuth.auth.signOut();
  }
}
