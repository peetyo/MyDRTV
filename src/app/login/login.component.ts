import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup

  constructor(private AuthService: AuthService, private router: Router, private formBuilder: FormBuilder,
    private firestore: AngularFirestore) {
    this.loginForm = this.formBuilder.group({
      'username': ['', Validators.required],
      'password': ['', [Validators.required]]
    });
   }

  ngOnInit() {

  }
  onSubmit(){
    console.log(this.loginForm.value)
    //PETER: Created for testing the connection to firestore
    // this.firestore.collection('users').add({username: 'peter', password: '123456',email: 'peter@gmail.com'});
  }
  // PETER: calling this fake api function to change isLoggedIn to true and give access to the rest of the page
  login(){
    this.AuthService.login().subscribe(
      data => {
          console.log(data); // should be boolean
              // this.router.navigate(['/'+this.AuthService.redirectUrl]);
          if(data == true){
            // if we were prompt to login when trying to access somewhere ristricted
            // the url is saved in teh auth service
            // if login goes as it should we are redirected to the
            // initially restricted url
            // if we went straight for the login page
            // we are redirected to home.
            if(this.AuthService.redirectUrl != undefined ){
              this.router.navigate(['/'+this.AuthService.redirectUrl]);
            }else{
              this.router.navigate(['portal']); 
            }
            this.AuthService.redirectUrl = undefined
          }else{
            console.log("could not log in")
          }
      })
  }
}
