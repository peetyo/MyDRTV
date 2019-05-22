import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'genre'
})
export class GenrePipe implements PipeTransform {
  transform(movies: any[], filterGenre: string = ''): any[] {

    if(!filterGenre) return movies;

    let result = movies.filter(movie => 
      movie.genres.join('').includes(filterGenre)
      );
    
    return result;
   }
}