import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from '../auth/store/auth.reducers';
import * as fromMovie from '../portal/movies/movie/store/movie.reducers';

export interface AppState {
    auth: fromAuth.State,
    movie: fromMovie.State
}

export const reducers: ActionReducerMap<AppState> = {
    auth: fromAuth.authReducer,
    movie: fromMovie.authReducer
};