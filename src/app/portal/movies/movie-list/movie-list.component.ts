import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { MovieListService } from './movie-list.service';
import * as fromApp from '../../../store/app.reducers';
import * as fromMovies from './store/movie-list.reducer';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  movieList: Observable<fromMovies.State>;
  // you gotta define movieshort yourself, or import it

  constructor(private moviesService: MovieListService, private store: Store<fromApp.AppState>) { 

  }

  ngOnInit() {
    this.moviesService.getAllMovies()
    this.movieList = this.store.select('movieList')
  }
}
