import { Component, OnInit, Input } from '@angular/core';
import { MovieShort } from 'src/app/models/movie-short.model';
import * as $ from 'jquery';

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

  // this triggers on click of the arrows next to the sliders
  scrollLeft(event){
    var target = $(event.target).parent().parent().find(".scrolling-wrapper");
    target.animate( { scrollLeft: '-=300' }, 500, "swing");
  }

  scrollRight(event){
    var target = $(event.target).parent().parent().find(".scrolling-wrapper");
    target.animate( { scrollLeft: '+=300' }, 500, "swing");
  }

}
