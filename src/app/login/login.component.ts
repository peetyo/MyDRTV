import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'src/app/models/user.model'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  list: User[];
  loginFailure: boolean;

  constructor(private AuthService: AuthService, private router: Router, private formBuilder: FormBuilder,
    private firestore: AngularFirestore) {
    this.loginForm = this.formBuilder.group({
      'username': ['', Validators.required],
      'password': ['', [Validators.required]]
    });
   }

  ngOnInit() {
    this.loginFailure = false;
  }

  // PETER: calling this fake api function to change isLoggedIn to true and give access to the rest of the page
  // login(){
  //   this.AuthService.login().subscribe(
  //     data => {
  //         console.log(data); // should be boolean
  //             // this.router.navigate(['/'+this.AuthService.redirectUrl]);
  //         // if(data == true){
  //         //   // if we were prompt to login when trying to access somewhere ristricted
  //         //   // the url is saved in teh auth service
  //         //   // if login goes as it should we are redirected to the
  //         //   // initially restricted url
  //         //   // if we went straight for the login page
  //         //   // we are redirected to home.
  //         //   if(this.AuthService.redirectUrl != undefined ){
  //         //     this.router.navigate(['/'+this.AuthService.redirectUrl]);
  //         //   }else{
  //         //     this.router.navigate(['portal']); 
  //         //   }
  //         //   this.AuthService.redirectUrl = undefined
  //         // }else{
  //         //   console.log("could not log in")
  //         // }
  //     })
  // }
  login(){
    this.AuthService.login(this.loginForm.value).subscribe(actionArray =>{
      this.list =  actionArray.map(item =>{
        return{
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as User
      }) 
      if(this.list.length == 0){
        console.log("Incorrect username or password")
        this.loginFailure = true
      }else{
        this.AuthService.isLoggedIn = true;
        localStorage.setItem("isLoggedIn","true")
        localStorage.setItem("userId",this.list[0].id)
        if(this.AuthService.redirectUrl != undefined ){
          this.router.navigate(['/'+this.AuthService.redirectUrl]);
        }else{
          this.router.navigate(['portal']); 
        }
        this.AuthService.redirectUrl = undefined
        this.loginFailure = false
      }
    });
  }
}
