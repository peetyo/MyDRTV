import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(private firestore : AngularFirestore) {
    if (localStorage.getItem("isLoggedIn") !== null) {
      this.isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"))
    }
   }

  login(loginData) {
    console.log('AuthService.login()')
    return this.firestore.collection('users', ref => ref.where('username','==',loginData.username).where('password','==',loginData.password)).snapshotChanges();
  }

  logout(): void {
    this.isLoggedIn = false;
    localStorage.clear();
  }
}