import { Action } from '@ngrx/store';

export const GET_MOVIES = 'GET_MOVIES';
export const MOVIES_LOADING = 'MOVIE_LOADING';
export const MOVIES_FAILURE = 'MOVIE_FAILURE';

export class GetMovies implements Action {
    readonly type = GET_MOVIES;
    constructor(public payload){}
}

export class MoviesLoading implements Action {
    readonly type = MOVIES_LOADING;
}

export class MoviesFailure implements Action {
    readonly type = MOVIES_FAILURE;
}
export type MovieActions = GetMovies | MoviesLoading | MoviesFailure;