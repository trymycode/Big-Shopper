import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CanActivate } from '@angular/router';
import { map, switchMap } from 'rxjs/operators'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate{

  constructor(private auth: AuthService, private UserService: UserService) { }

   canActivate(): Observable<boolean> {
     return this.auth.appUser$.pipe(
       map(appUser => appUser.isAdmin)
     );
   }
}
