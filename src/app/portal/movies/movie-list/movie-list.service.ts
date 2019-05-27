import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MovieShort } from 'src/app/models/movie-short.model';

import { Store } from '@ngrx/store';

import * as fromApp from '../../../store/app.reducers';
import * as MoviesActions from './store/movie-list.actions';

@Injectable({
  providedIn: 'root'
})
export class MovieListService {

  constructor(private firestore: AngularFirestore, private store: Store<fromApp.AppState>) { }

  getAllMovies(){
      this.store.dispatch(new MoviesActions.MoviesLoading())
    return this.firestore.collection('movielist').snapshotChanges().subscribe(actionArray => {
        if(actionArray.length !== 0){
            let movieFullList = actionArray.map(item => {
              return {
                id : item.payload.doc.id,
                ...item.payload.doc.data()} as MovieShort
            });
            this.store.dispatch(new MoviesActions.GetMovies(movieFullList))
        }else{
            this.store.dispatch(new MoviesActions.MoviesFailure()) 
        }
      });

    };
}
