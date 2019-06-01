import { Action } from '@ngrx/store';

export const GET_MOVIE = 'GET_MOVIE';
export const GET_REVIEWS = 'GET_REVIEWS';
export const CLEAR_MOVIE = 'CLEAR_MOVIE';
export const MOVIE_LOADING = 'MOVIE_LOADING';
export const MOVIE_FAILURE = 'MOVIE_FAILURE';

export class GetMovie implements Action {
    readonly type = GET_MOVIE;
    constructor(public payload: Object){}
}

export class GetReviews implements Action {
    readonly type = GET_REVIEWS;
    constructor(public payload: any[]){}
}

export class ClearMovie implements Action {
    readonly type = CLEAR_MOVIE;
}

export class MovieLoading implements Action {
    readonly type = MOVIE_LOADING;
}

export class MovieFailure implements Action {
    readonly type = MOVIE_FAILURE;
}
export type MovieActions = GetMovie | GetReviews | ClearMovie | MovieLoading | MovieFailure;