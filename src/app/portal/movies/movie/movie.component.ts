import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from './movie.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducers';
import * as fromMovie from './store/movie.reducers';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  movieId: string;
  movie: Observable<fromMovie.State>;
  constructor(private movieService: MovieService, private route: ActivatedRoute, private store: Store<fromApp.AppState>) { 
    this.movie = this.store.select('movie')
    this.route.params.subscribe(params => {
      this.movieId = params['id'];
      console.log(params['id'])
      this.getMovieAndReviews(this.movieId)
      
    });
  }
  
  
  ngOnInit() {
  }

  getMovieAndReviews(movieId){
    this.movieService.getMovie(movieId)
  }
}
