import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
// Login
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
// Portal
import { PortalComponent } from './portal/portal.component';
import { HomeComponent } from './portal/home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MoviesComponent } from './portal/movies/movies.component'

// Imports
import { RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    FooterComponent,
    PortalComponent,
    NotFoundComponent,
    MoviesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '' , redirectTo: '/portal', pathMatch: 'full'},
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'portal', component: PortalComponent,
        canActivate: [AuthGuard], 
        children: [
        { path: '' , redirectTo: 'home', pathMatch: 'full'},
        { path: 'home',  component: HomeComponent },
        { path: 'movies',  component: MoviesComponent },
      ]},
      { path: '**', component: NotFoundComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
