import * as AuthActions from './auth.actions';

export interface State {
    token: string;
    authenticated: boolean;
    displayName: string;
    email: string;
    uid: string;
}
const initialState: State = {
    token: null,
    authenticated: false,
    displayName: null,
    email: null,
    uid: null
}
export function authReducer(state = initialState, action: AuthActions.AuthActions){
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
                token: action.payload
            };
        default: 
            return state;
    }
}