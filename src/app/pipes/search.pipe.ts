import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(movies: any[], searchText: string = ''): any[] {
    // the use of trim is a result of unit testing
    if(!searchText.trim()) return movies;

    searchText = searchText.trim().toLowerCase();

    let result = movies.filter(movie => 
      movie.title.toLowerCase().includes(searchText) || 
      movie.genres.join('').includes(searchText) ||
      movie.keywords.join('').includes(searchText) ||
      movie.actors.join('').toLowerCase().includes(searchText)
      );
    
    return result;
   }
}