import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(movies: any[], searchText: string = ''): any[] {

    if(!searchText) return movies;

    searchText = searchText.toLowerCase();

    let result = movies.filter(movie => 
      movie.title.toLowerCase().includes(searchText) || 
      movie.genres.join('').includes(searchText)
      );
    
    return result;
   }
}