import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from  "@angular/fire/auth";
import { Store } from '@ngrx/store';

import * as fromApp from '../../../store/app.reducers';
import * as MovieActions from './store/movie.actions';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private firestore : AngularFirestore,private store: Store<fromApp.AppState>) { }

  getMovie(movieId: string){
      movieId = "274eCdHpwPdHrnd20Ndw";
      this.firestore.collection('movies').doc(movieId).snapshotChanges().subscribe(movieDoc => {
        let movieObject = {id: movieDoc.payload.id,
          ...movieDoc.payload.data()}

      this.store.dispatch(new MovieActions.GetMovie(movieObject));
        console.log(movieObject)
      });
  }
  
  getReviews(movieId: string){
      movieId = "274eCdHpwPdHrnd20Ndw";
      return this.firestore.collection('movies').doc(movieId).collection('reviews').snapshotChanges();
  }

}
