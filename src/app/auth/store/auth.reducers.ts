import * as AuthActions from './auth.actions';

export interface State {
    token: string;
    authenticated: boolean;
    displayName: string;
    email: string;
    uid: string;
    loading: boolean;
}
const initialState: State = {
    token: null,
    authenticated: false,
    displayName: null,
    email: null,
    uid: null,
    loading: false
}
// switched the action to type any just to run the initial state test passing {}
// export function authReducer(state = initialState, action: AuthActions.AuthActions){
export function authReducer(state = initialState, action: any){
    switch (action.type){
        case (AuthActions.SIGNUP):
        case (AuthActions.SIGNIN):
            return {
                ...state,
                authenticated: true,
                displayName: action.payload.displayName,
                email: action.payload.email,
                uid: action.payload.uid
            };
        case (AuthActions.LOGOUT):
            return {
                ...state,
                token: null,
                authenticated: false,
                displayName: null,
                email: null,
                uid: null
            };
        case (AuthActions.SET_TOKEN):
            return {
                ...state,
                token: action.payload,
                loading: false
            };
        case (AuthActions.AUTH_LOADING):
            return {
                ...state,
                loading: true
            };
        case (AuthActions.AUTH_FAILURE):
            return {
                ...state,
                loading: false
            };
        default: 
            return state;
    }
}