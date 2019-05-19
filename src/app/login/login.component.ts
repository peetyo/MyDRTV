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
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required]]
    });
   }

  ngOnInit() {
    this.loginFailure = false;
  }
  login(){
    const formData = Object.assign({},this.loginForm.value)
    this.AuthService.loginWithAuth(formData).then(res=>{ 
      this.loginFailure = !res
      if(res){
        if(this.AuthService.redirectUrl != undefined ){
          this.router.navigate(['/'+this.AuthService.redirectUrl]);
        }else{
          this.router.navigate(['portal']); 
        }
        this.AuthService.redirectUrl = undefined
      }
    })
  }
  
  // login(){
  //   this.AuthService.login(this.loginForm.value).subscribe(actionArray =>{
  //     this.list =  actionArray.map(item =>{
  //       return{
  //         id: item.payload.doc.id,
  //         ...item.payload.doc.data()
  //       } as User
  //     }) 
  //     if(this.list.length == 0){
  //       console.log("Incorrect username or password")
  //       this.loginFailure = true
  //     }else{
  //       this.AuthService.isLoggedIn = true;
  //       localStorage.setItem("isLoggedIn","true")
  //       localStorage.setItem("userId",this.list[0].id)
  //       if(this.AuthService.redirectUrl != undefined ){
  //         this.router.navigate(['/'+this.AuthService.redirectUrl]);
  //       }else{
  //         this.router.navigate(['portal']); 
  //       }
  //       this.AuthService.redirectUrl = undefined
  //       this.loginFailure = false
  //     }
  //   });
  // }
}
