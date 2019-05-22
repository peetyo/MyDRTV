import { Action } from '@ngrx/store';

export const SIGNUP = 'SIGNUP';
export const SIGNIN = 'SIGNIN';
export const LOGOUT = 'LOGOUT';
export const SET_TOKEN = 'SET_TOKEN';
export const SET_AUTH = 'SET_AUTH';
export const GET_USER_DATA = 'GET_USER_DATA';

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

export class SetAuth implements Action {
    readonly type = SET_AUTH;
    constructor(public token: string, public authenticated: boolean){}
}

export class GetUserData implements Action {
    readonly type = GET_USER_DATA;
    constructor(public payload: Object){}
}

export type AuthActions = Signup | Signin | Logout | SetToken | SetAuth | GetUserData;

