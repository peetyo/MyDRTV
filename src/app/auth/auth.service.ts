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
  // user: {}
  private isAuthenticatedSubject = new ReplaySubject<boolean>(0);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(private firestore : AngularFirestore, private firebaseAuth:  AngularFireAuth) {
    // if (localStorage.getItem("isLoggedIn") !== null) {
    //   this.isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"))
    // }
    // this.checkIfLoggedIn()
   }
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
  // login(loginData) {
  //   console.log('AuthService.login()')
  //   return this.firestore.collection('users', ref => ref.where('username','==',loginData.username).where('password','==',loginData.password)).snapshotChanges();
  // }
  
  // logout(): void {
  //   this.isLoggedIn = false;
  //   localStorage.clear();
  // }
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