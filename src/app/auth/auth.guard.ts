import { Injectable, NgZone } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { skip,map} from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { AuthService } from '../auth/auth.service';
import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  authState: Observable<fromAuth.State>;
  constructor(private authService: AuthService,
    private router: Router, 
    private ngZone: NgZone,
    private store: Store<fromApp.AppState>) {

    }
    
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean>  | boolean{
    // could add redirect URL to the store
    let url: string = state.url;
        
    this.authService.setAuth()
    return this.store.select('auth').pipe(skip(1),map((authState: fromAuth.State) =>{
      if(authState.authenticated == false){
        this.ngZone.run(() => this.router.navigate(['/login']));
        return authState.authenticated;
      }else{
        return authState.authenticated;
      }
    }))
  }
}