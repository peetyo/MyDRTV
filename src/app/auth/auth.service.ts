import { Injectable } from '@angular/core';

import { Observable, of, ReplaySubject } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from  "@angular/fire/auth";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean;
  private isAuthenticatedSubject = new ReplaySubject<boolean>(0);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(private firestore : AngularFirestore, private firebaseAuth:  AngularFireAuth) {   }
   setAuth() {
    this.firebaseAuth.auth.onAuthStateChanged(user => {
      if(user){
        console.log("User logged in", user)
        this.isLoggedIn = true;
        console.log(this.isLoggedIn)
        this.isAuthenticatedSubject.next(true);
      }else{
        console.log("User logged out")
        this.isLoggedIn = false;
        this.isAuthenticatedSubject.next(false);
      }
    })
  }
  register(formData){
    const email = formData.email;
    const password = formData.password;
    this.firebaseAuth.auth.createUserWithEmailAndPassword(email,password).then(cred => {
    })
  }
  logoutWithAuth(){
    this.firebaseAuth.auth.signOut().then(()=>{
    })
  }
  loginWithAuth(loginData){
    console.log('loginWithAuth');
    const email = loginData.email;
    const password = loginData.password;
    return this.firebaseAuth.auth.signInWithEmailAndPassword(email,password).then(cred => { return true;
    }).catch(error =>{return false})
  }
  checkIfLoggedIn(){
    this.firebaseAuth.auth.onAuthStateChanged(user => {
      if(user){
        console.log("User logged in", user)
        this.isLoggedIn = true;
        console.log(this.isLoggedIn)
        return true
      }else{
        console.log("User logged out")
        this.isLoggedIn = false;
        return false
      }
    })
  }
}