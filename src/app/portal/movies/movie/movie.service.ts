import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from  "@angular/fire/auth";
import { firestore } from 'firebase';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../store/app.reducers';
import * as MovieActions from './store/movie.actions';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private firestore : AngularFirestore,private firebaseAuth: AngularFireAuth,private store: Store<fromApp.AppState>, private router: Router) { }

  getMovie(movieId: string){
      // Get the movie data;
      this.store.dispatch(new MovieActions.MovieLoading());
    this.firestore.collection('movies').doc(movieId).snapshotChanges().subscribe(movieDoc => {
      if(movieDoc.payload.data()){
        let movieObject = {id: movieDoc.payload.id,
          ...movieDoc.payload.data()}
        this.store.dispatch(new MovieActions.GetMovie(movieObject));

        // Get the reviews
        this.firestore.collection('movies').doc(movieId).collection('reviews').snapshotChanges().subscribe(actionArray => {
          let reviews = actionArray.map(reviewDoc => {
            return {
              id : reviewDoc.payload.doc.id,
              ...reviewDoc.payload.doc.data()}
            })
          this.store.dispatch(new MovieActions.GetReviews(reviews));
        });

      }else{
        this.store.dispatch(new MovieActions.MovieFailure());
        this.router.navigate(['404'])
      }
    })
  }

  addReview(movieId,reviewData){
    let displayName = this.firebaseAuth.auth.currentUser.displayName;
    reviewData.username = displayName
    reviewData.created_on = firestore.Timestamp.fromDate(new Date)
    reviewData.contains_spoilers = false

    this.firestore.collection('movies').doc(movieId).collection('reviews').add(reviewData)
  }
}
