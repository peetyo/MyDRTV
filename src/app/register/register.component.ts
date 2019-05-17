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

  constructor(private formBuilder: FormBuilder, private firestore: AngularFirestore, private router: Router) { 

    this.registerForm = this.formBuilder.group({

      'username': ['', [Validators.required,Validators.minLength(5),Validators.maxLength(20)]],
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required,Validators.minLength(5),Validators.maxLength(20)]],
      'confirmPassword': ['', [Validators.required]],
      
    });
   }

  ngOnInit() {
  }

  // onSubmit(){
  //   console.log("Runing onSubmit()");
  // }

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
