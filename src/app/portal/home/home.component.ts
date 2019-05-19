import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { MovieShort } from 'src/app/models/movie-short.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  movieList: MovieShort[];
  movieListNew: MovieShort[];
  movieListPopular: MovieShort[];
  movieListMyList: MovieShort[];

  constructor(private moviesService: MoviesService) { }

  ngOnInit() {
    this.getMovieList('getMovieList', 'movieList');
    this.getMovieList('getMovieListNew', 'movieListNew');
    this.getMovieList('getMovieListPopular', 'movieListPopular');
  }
  getMovieList(method,listName){
    this.moviesService[method]().subscribe(actionArray =>{
      this[listName] =  actionArray.map(item =>{
        return{
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as MovieShort
      }) 
    });
  }
}
