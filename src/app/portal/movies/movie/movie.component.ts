import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from './movie.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducers';
import * as fromMovie from './store/movie.reducers';
import * as MovieActions from './store/movie.actions';
import { Observable, Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MovieShort } from 'src/app/models/movie-short.model';
import { MoviesService } from 'src/app/services/movies.service';

// experimental - this is so iFrame would work without a security alert
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit,OnDestroy {

  reviewForm: FormGroup
  movieId: string;
  movie: Observable<fromMovie.State>;
  movieList: MovieShort[];
  movieSub: Subscription;
  isPlaying: boolean;
  youtubeCode;
 
  
  constructor(private formBuilder: FormBuilder,
    private movieService: MovieService,
    private moviesService: MoviesService, 
    private route: ActivatedRoute, 
    private store: Store<fromApp.AppState>,
    public sanitizer: DomSanitizer) { 
   
   this.reviewForm = this.formBuilder.group({

      'star_rating': ['', [Validators.required]],
      'headline': ['', [Validators.required,Validators.minLength(6),Validators.maxLength(80)]],
      'content': ['', [Validators.required,Validators.minLength(20),Validators.maxLength(1000)]]
      
    });
    
  }
  
  ngOnInit() {
    window.scroll(0,0);
    this.movie = this.store.select('movie')

    this.route.params.subscribe(params => {
      this.movieId = params['id'];
      this.getMovieAndReviews(this.movieId)
      window.scroll(0,0);
    });

    this.getMovieList()

    console.log(this.getMovieAndReviews);

    this.movieSub = this.movie.subscribe(movie=>{
      // the autoplay on the line below worked, and then stopped randomly
      this.youtubeCode = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/"+movie.youtube_code+"?autoplay=1&controls=0");
      console.log(this.youtubeCode);
    })
  }

  playMovie(){
    this.isPlaying = true;
    // console.log("Playing? "+this.isPlaying);
  }

  stopMovie(){
    this.isPlaying = false;
    // console.log("Playing? "+this.isPlaying);
  }

  ngOnDestroy(){
    this.store.dispatch(new MovieActions.ClearMovie());
    this.movieSub.unsubscribe();
  }

  getMovieAndReviews(movieId){
    this.movieService.getMovie(movieId)
  }

  addReview(){
    this.movieService.addReview(this.movieId,this.reviewForm.value)
    this.reviewForm.reset()
  }

  getMovieList(){
    this.moviesService.getMovieList().subscribe(actionArray =>{
      this.movieList =  actionArray.map(item =>{
        return{
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as MovieShort
      }) 
    });
  }
}
