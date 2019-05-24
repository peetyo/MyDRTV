import { Action } from '@ngrx/store';

export const GET_MOVIE = 'GET_MOVIE';

export class GetMovie implements Action {
    readonly type = GET_MOVIE;
    constructor(public payload: string){}
}
export type MovieActions = GetMovie ;
// export type AuthActions = Signup | Signin | Logout | SetToken ;