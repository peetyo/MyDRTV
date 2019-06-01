import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private firestore: AngularFirestore) { }

  getMovieList(){
    return this.firestore.collection('movielist', ref => ref.limit(10)).snapshotChanges();
  }
  getMovieListNew(){
    return this.firestore.collection('movielist', ref => ref.orderBy("title", 'desc').limit(10)).snapshotChanges();
  }
  getMovieListPopular(){
    return this.firestore.collection('movielist', ref => ref.where('star_rating','>',7).limit(10)).snapshotChanges();
  }
  getAllMovies(){
    return this.firestore.collection('movielist').snapshotChanges();
  }
}
