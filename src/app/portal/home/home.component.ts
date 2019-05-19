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
  movieListTest: MovieShort[] = [
    {
    id: "testid",
    title: "A Star Is Born",
    thumbnail_url: "thumbnail_a_star_is_born.jpg",
    star_rating:"8.5",
    duration:"136",
    genres: ["drama" , "music", "romance"]
    },
    {
      id: "testid",
      title: "A Star Is Born",
      thumbnail_url: "thumbnail_a_star_is_born.jpg",
      star_rating:"8.5",
      duration:"136",
      genres: ["drama" , "music", "romance"]
      },
      {
        id: "testid",
        title: "A Star Is Born",
        thumbnail_url: "thumbnail_a_star_is_born.jpg",
        star_rating:"8.5",
        duration:"136",
        genres: ["drama" , "music", "romance"]
        },
        {
          id: "testid",
          title: "A Star Is Born",
          thumbnail_url: "thumbnail_a_star_is_born.jpg",
          star_rating:"8.5",
          duration:"136",
          genres: ["drama" , "music", "romance"]
          },
  ];

  constructor(private moviesService: MoviesService) { }

  ngOnInit() {
    this.getMovieList('getMovieList', 'movieList');
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
