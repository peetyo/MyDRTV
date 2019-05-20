import { Component, OnInit, Input } from '@angular/core';
import { MovieShort } from 'src/app/models/movie-short.model';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  
  @Input()
  public movieList: MovieShort[];
  
  constructor() { }

  ngOnInit() {
  }

}
