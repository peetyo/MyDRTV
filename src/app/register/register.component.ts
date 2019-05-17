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

  constructor(private AuthService: AuthService, private router: Router, private formBuilder: FormBuilder,
    private firestore: AngularFirestore) { 

    this.registerForm = this.formBuilder.group({

      'username': ['', Validators.required],
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required]],
      'confirmPassword': ['', [Validators.required]],
      
    });
   }

  ngOnInit() {
  }

  onSubmit(){
    console.log(this.registerForm.value);
  }

}
