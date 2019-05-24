import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from './movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  movieId: string;
  movie: Object;
  reviews: any[];
  constructor(private movieService: MovieService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.movieId = params['id'];
      console.log(params['id'])
      this.getMovieAndReviews(this.movieId)
    });
  }

  getMovieAndReviews(movieId){
    this.movieService.getMovie(movieId)
  }
}
