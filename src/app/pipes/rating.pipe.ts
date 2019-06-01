import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rating'
})
export class RatingPipe implements PipeTransform {

  transform(movies: any[], filterRating: number = 0): any {
    if(filterRating == 0) return movies;

    let result = movies.filter(movie => 
      movie.star_rating >= filterRating
      );
    
    return result;

  }

}
