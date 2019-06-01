import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private firestore: AngularFirestore, 
    private router: Router, 
    private AuthService: AuthService) { 

    this.registerForm = this.formBuilder.group({

      'fullName': ['', [Validators.required,Validators.minLength(5),Validators.maxLength(20)]],
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required,Validators.minLength(6),Validators.maxLength(20)]],
      'confirmPassword': ['', [Validators.required]],
      
    });
   }

  ngOnInit() {
  }

  // onSubmit(){
  //   console.log("Runing onSubmit()");
  // }
  registerWithAuth(){
    const formData = Object.assign({},this.registerForm.value);
    delete formData.confirmPassword;
    this.AuthService.register(formData);
  }
  register(){
    let data = Object.assign({},this.registerForm.value);
    delete data.confirmPassword;
    this.firestore.collection('users').add(data);
    this.router.navigate(['login']); 
  }

  // register(){
  //   // ADAM: Plug in database query and oauth here
  //   console.log("Running register() function");
  //   console.log(this.registerForm.value);
  // }

}
