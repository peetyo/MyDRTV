import { Action } from '@ngrx/store';

export const GET_MOVIE = 'GET_MOVIE';
export const GET_REVIEWS = 'GET_REVIEWS';
export const CLEAR_MOVIE = 'CLEAR_MOVIE';

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

export type MovieActions = GetMovie | GetReviews | ClearMovie;
// export type AuthActions = Signup | Signin | Logout | SetToken ;