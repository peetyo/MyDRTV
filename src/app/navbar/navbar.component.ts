import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthService } from '../auth/auth.service';
import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  authState: Observable<fromAuth.State>;

  constructor(private AuthService: AuthService, 
              private router: Router,
              private store: Store<fromApp.AppState>) { }

  ngOnInit() {
   this.authState = this.store.select('auth')
  }

  logout(){
    // this.AuthService.logout();
    this.AuthService.logoutWithAuth();
    this.router.navigate(['login']); 
  }

}
