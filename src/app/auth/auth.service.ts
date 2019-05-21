import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from  "@angular/fire/auth";
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducers';
import * as AuthActions from './store/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(private firestore : AngularFirestore,
    private firebaseAuth:  AngularFireAuth,
    private router: Router,
    private store: Store<fromApp.AppState>) {   }
   setAuth() {
    this.firebaseAuth.auth.onAuthStateChanged(user => {
      if(user){
        console.log("User logged in", user)
        this.store.dispatch(new AuthActions.Signin());
        this.firebaseAuth.auth.currentUser.getIdToken()
          .then((token:string) =>{
            this.store.dispatch(new AuthActions.SetToken(token))
          })
      }else{
        console.log("User NOT logged in")
        this.store.dispatch(new AuthActions.Logout());
      }
    })
  }
  register(formData){
    const email = formData.email;
    const password = formData.password;
    const fullName = formData.fullName;
    this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password)
    .then(credentials =>{
      if(credentials.user){
        credentials.user.updateProfile({
          displayName: fullName
        })
        .then(()=>{ 
          //Redux 
          this.store.dispatch(new AuthActions.Signup());
          this.router.navigate(['portal/home'])
          this.firebaseAuth.auth.currentUser.getIdToken()
            .then((token:string) =>{
              this.store.dispatch(new AuthActions.SetToken(token))
            })
          }, (error)=>{ console.log("Error when updating display name", error)})
        }else{
          console.error("User was not created")
      }
    })
    .catch(function(error) {
      console.error("Internal Server error", error)
    });
  }

  logoutWithAuth(){
    this.firebaseAuth.auth.signOut();
    this.store.dispatch(new AuthActions.Logout());
  }
  loginWithAuth(loginData){
    // Remove return and  use the store state.
    console.log('loginWithAuth');
    const email = loginData.email;
    const password = loginData.password;
    return this.firebaseAuth.auth.signInWithEmailAndPassword(email,password)
    .then(cred => { 
      this.store.dispatch(new AuthActions.Signin());
      this.router.navigate(['portal']); 
      this.firebaseAuth.auth.currentUser.getIdToken()
        .then((token:string) =>{
          this.store.dispatch(new AuthActions.SetToken(token))
        })
    }).catch(error =>{return false})
  }
}