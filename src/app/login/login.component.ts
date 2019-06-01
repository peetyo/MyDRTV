import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginFailure: boolean;

  constructor(private AuthService: AuthService, 
    private formBuilder: FormBuilder) {
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
    this.AuthService.loginWithAuth(formData).then((res:boolean)=>{
      this.loginFailure = !res;
    })
  }
}
