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
    // this.getReviews("abcd")
  }

  getMovieAndReviews(movieId){
    this.movieService.getMovie(movieId)
  }

  getReviews(movieId){
    this.movieService.getReviews(movieId).subscribe(actionArray => {
      this.reviews = actionArray.map(item => {
        console.log(item.payload.doc.data());
        return {
          id : item.payload.doc.id,
          ...item.payload.doc.data()}
      })
      // you return the ID separately because it's not part of the document itself - it is on top of it
      // after the ID, you just pass in all of the data
      // the ... notation is the OBJECT DESTRUCTURING OPERATOR (aka SPREAD)
    });
  }
}
