import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from '../auth/store/auth.reducers';
import * as fromMovie from '../portal/movies/movie/store/movie.reducers';
import * as fromMovies from '../portal/movies/movie-list/store/movie-list.reducer';

export interface AppState {
    auth: fromAuth.State,
    movie: fromMovie.State,
    movieList: fromMovies.State
}

export const reducers: ActionReducerMap<AppState> = {
    auth: fromAuth.authReducer,
    movie: fromMovie.movieReducer,
    movieList: fromMovies.moviesReducer
};