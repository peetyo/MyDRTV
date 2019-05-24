import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../../services/movies.service';
import { MovieShort } from '../../../models/movie-short.model';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  movieFullList: MovieShort[];
  // you gotta define movieshort yourself, or import it

  constructor(private moviesService: MoviesService) { 

  }

  ngOnInit() {
    this.getAllMovies();
  }

  getAllMovies(){
    this.moviesService.getAllMovies().subscribe(actionArray => {
      this.movieFullList = actionArray.map(item => {
        console.log(item.payload.doc.data());
        return {
          id : item.payload.doc.id,
          ...item.payload.doc.data()} as MovieShort
      })
      // you return the ID separately because it's not part of the document itself - it is on top of it
      // after the ID, you just pass in all of the data
      // the ... notation is the OBJECT DESTRUCTURING OPERATOR (aka SPREAD)
    });
    // you SUBSCRIBE because this returns an OBSERVABLE
    // that way there are live updates
    // even if data doesnt change, you just get all of it
    // 
  }
}
