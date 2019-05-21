import { Action } from '@ngrx/store';

export const SIGNUP = 'SIGNUP';
export const SIGNIN = 'SIGNIN';
export const LOGOUT = 'LOGOUT';
export const SET_TOKEN = 'SET_TOKEN';
export const SET_AUTH = 'SET_AUTH';

export class Signup implements Action {
    readonly type = SIGNUP;
}

export class Signin implements Action {
    readonly type = SIGNIN;
}

export class Logout implements Action {
    readonly type = LOGOUT;
}

export class SetToken implements Action {
    readonly type = SET_TOKEN;

    constructor(public payload: string){}
}

export class SetAuth implements Action {
    readonly type = SET_AUTH;
    constructor(public token: string, public authenticated: boolean){}
}

export type AuthActions = Signup | Signin | Logout | SetToken | SetAuth;

