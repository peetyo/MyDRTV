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

  constructor(
    private firebaseAuth:  AngularFireAuth,
    private router: Router,
    private store: Store<fromApp.AppState>) {   }
  
  setAuth() {
    this.store.dispatch(new AuthActions.AuthLoading());
    this.firebaseAuth.auth.onAuthStateChanged(user => {
      if(user){
        this.store.dispatch(new AuthActions.Signin(user));
        this.firebaseAuth.auth.currentUser.getIdToken()
        .then((token:string) =>{
            this.store.dispatch(new AuthActions.SetToken(token))
          })
        }else{
          this.store.dispatch(new AuthActions.AuthFailure())
        // this.store.dispatch(new AuthActions.Logout());
      }
    })
  }

  register(formData){
    this.store.dispatch(new AuthActions.AuthLoading());
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
          this.store.dispatch(new AuthActions.Signup(credentials.user));
          this.firebaseAuth.auth.currentUser.getIdToken()
          .then((token:string) =>{
            this.store.dispatch(new AuthActions.SetToken(token))
            this.router.navigate(['portal/home'])
            })
          }, error=>{ console.log("Error when updating display name", error)
              this.store.dispatch(new AuthActions.AuthFailure())})
        }else{
          this.store.dispatch(new AuthActions.AuthFailure())
          console.error("User was not created")
        }
      })
      .catch(error => {
        console.error(error.message)
        this.store.dispatch(new AuthActions.AuthFailure())
    });
  }

  logoutWithAuth(){
    this.firebaseAuth.auth.signOut();
    this.store.dispatch(new AuthActions.Logout());
  }
  loginWithAuth(loginData){
    this.store.dispatch(new AuthActions.AuthLoading());
    const email = loginData.email;
    const password = loginData.password;
    return this.firebaseAuth.auth.signInWithEmailAndPassword(email,password)
    .then(cred => { 
      this.store.dispatch(new AuthActions.Signin(cred.user));
      this.router.navigate(['portal']); 
      this.firebaseAuth.auth.currentUser.getIdToken()
        .then((token:string) =>{
          this.store.dispatch(new AuthActions.SetToken(token))
        })
    }).catch(error =>{
      this.store.dispatch(new AuthActions.AuthFailure());
      return false})
  }
}