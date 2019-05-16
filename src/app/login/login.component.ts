import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private AuthService: AuthService, private router: Router) { }

  ngOnInit() {

  }
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
