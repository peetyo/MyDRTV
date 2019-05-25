import { Component, OnInit, Input } from '@angular/core';
import { MovieShort } from 'src/app/models/movie-short.model';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  moviePath: string
  @Input()
  public movieList: MovieShort[];
  @Input()
  public parent: string;
  
  constructor() { }

  ngOnInit() {
    if(this.parent == 'movie'){
      this.moviePath = '../'
    }else{
      this.moviePath = '../movies/'
    }
  }

}
