import { Action } from '@ngrx/store';

export const SIGNUP = 'SIGNUP';
export const SIGNIN = 'SIGNIN';
export const LOGOUT = 'LOGOUT';
export const SET_TOKEN = 'SET_TOKEN';
export const AUTH_LOADING = 'AUTH_LOADING';
export const AUTH_FAILURE = 'AUTH_FAILURE';

export class Signup implements Action {
    readonly type = SIGNUP;
    constructor(public payload){}
}

export class Signin implements Action {
    readonly type = SIGNIN;
    constructor(public payload){}
}

export class Logout implements Action {
    readonly type = LOGOUT;
}

export class SetToken implements Action {
    readonly type = SET_TOKEN;

    constructor(public payload: string){}
}

export class AuthLoading implements Action {
    readonly type = AUTH_LOADING;
}

export class AuthFailure implements Action {
    readonly type = AUTH_FAILURE;
}

export type AuthActions = Signup | Signin | Logout | SetToken | AuthLoading | AuthFailure;

