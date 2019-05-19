import { Injectable, NgZone } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService }      from './auth.service';
import { Observable } from 'rxjs';
import { take,map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private ngZone: NgZone) {

    
    this.authService.setAuth()
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean{
    let url: string = state.url;

    return this.checkLogin().pipe(map(data => {
      if (data == false) {
        this.ngZone.run(() => this.router.navigate(['/login']));
        // this.router.navigate(['/login']);
        return data;
      }else if(data == true){
        // this.router.navigate(['/login']);
        return data; 
      }
    }, error =>{ return error} 
    ));
  }
  checkLogin(){
    return this.authService.isAuthenticated.pipe(take(1));
  }

  // checkLogin(url: string): boolean {
  //   if (this.authService.isLoggedIn) { return true; }

  //   // Store the attempted URL for redirecting
  //   this.authService.redirectUrl = url;

  //   // Navigate to the login page with extras
  //   this.router.navigate(['/login']);
  //   return false;
  // }
}