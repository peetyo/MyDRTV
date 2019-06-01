import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

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
import { RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { environment } from 'src/environments/environment';
import { SliderComponent } from './portal/slider/slider.component';
import { MovieComponent } from './portal/movies/movie/movie.component';
import { MovieListComponent } from './portal/movies/movie-list/movie-list.component';
// Redux
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/app.reducers';
// Pipes
import { SearchPipe } from './pipes/search.pipe';
import { GenrePipe } from './pipes/genre.pipe';
import { RatingPipe } from './pipes/rating.pipe';
import { DurationPipe } from './pipes/duration.pipe';

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
    MoviesComponent,
    MovieComponent,
    MovieListComponent,
    SliderComponent,
    DurationPipe,
    SearchPipe,
    GenrePipe,
    RatingPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    RouterModule.forRoot([
      { path: '' , redirectTo: '/portal/home', pathMatch: 'full'},
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'portal', component: PortalComponent,
        canActivate: [AuthGuard], 
        children: [
        { path: '' , redirectTo: 'home', pathMatch: 'full'},
        { path: 'home',  component: HomeComponent },
        { path: 'movies',  component: MoviesComponent , children: [
          { path: ':id',  component: MovieComponent },
          { path: '',  component: MovieListComponent }
        ]},
        
      ]},
      { path: '**', component: NotFoundComponent }
    ],{ useHash: true, preloadingStrategy: PreloadAllModules }),
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
