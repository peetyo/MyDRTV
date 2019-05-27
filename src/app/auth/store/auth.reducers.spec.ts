    
import * as fromAuth from './auth.reducers';
import * as types from './auth.actions';
var deepFreeze = require('deep-freeze');

fdescribe('Auth Reducer', () => {

    fit('Should return the initial state', () => {
        expect(fromAuth.authReducer(undefined, {})).toEqual(
          { token: null,
            authenticated: false,
            displayName: null,
            email: null,
            uid: null,
            loading: false} as fromAuth.State);
    });

    fit('Signin should update auth properties', () => {
    
        let state = {token: null,
            authenticated: false,
            displayName: null,
            email: null,
            uid: null,
            loading: true} as fromAuth.State;
        deepFreeze(state);
        
        expect( fromAuth.authReducer(state, { type: types.SIGNIN,
            payload: {
            token: null,
            authenticated: true,
            displayName: "Peter Todorov",
            email: "test@gmail.com",
            uid: "jMo2PEsGzkRHhcIxJ31FzCBUL6E2"} }))
            .toEqual({
                token: null,
                authenticated: true,
                displayName: "Peter Todorov",
                email: "test@gmail.com",
                uid: "jMo2PEsGzkRHhcIxJ31FzCBUL6E2",
                loading: true} as fromAuth.State);
      });

      fit('Signup should update auth properties', () => {
    
        let state = {token: null,
            authenticated: false,
            displayName: null,
            email: null,
            uid: null,
            loading: true} as fromAuth.State;
        deepFreeze(state);
        
        expect( fromAuth.authReducer(state, { type: types.SIGNUP,
            payload: {
            token: null,
            authenticated: true,
            displayName: "Peter Todorov",
            email: "test@gmail.com",
            uid: "jMo2PEsGzkRHhcIxJ31FzCBUL6E2"} }))
            .toEqual({
                token: null,
                authenticated: true,
                displayName: "Peter Todorov",
                email: "test@gmail.com",
                uid: "jMo2PEsGzkRHhcIxJ31FzCBUL6E2",
                loading: true} as fromAuth.State);
      });

      fit('Should update auth token', () => {
    
        let state = {token: null,
            authenticated: false,
            displayName: null,
            email: null,
            uid: null,
            loading: true} as fromAuth.State;
        deepFreeze(state);
        
        expect( fromAuth.authReducer(state, { type: types.SET_TOKEN,
            payload: 'generatedtoken' }))
            .toEqual({
                token: 'generatedtoken',
                authenticated: false,
                displayName: null,
                email: null,
                uid: null,
                loading: false} as fromAuth.State);
      });

      fit('Should reset auth state', () => {
    
        let state = {token: 'generatedtoken',
            authenticated: true,
            displayName: "Peter Todorov",
            email: "test@gmail.com",
            uid: "jMo2PEsGzkRHhcIxJ31FzCBUL6E2",
            loading: false} as fromAuth.State;
        deepFreeze(state);
        
        expect( fromAuth.authReducer(state, { type: types.LOGOUT }))
            .toEqual({
                token: null,
                authenticated: false,
                displayName: null,
                email: null,
                uid: null,
                loading: false} as fromAuth.State);
      });
})