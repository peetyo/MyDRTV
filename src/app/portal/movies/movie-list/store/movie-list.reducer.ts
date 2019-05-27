import * as MoviesActions from './movie-list.actions';
import { MovieShort } from '../../../../models/movie-short.model';

export interface State {
    movieList: MovieShort[];
    loading: boolean;
}
const initialState: State = {
    movieList: [],
    loading: false
}

export function moviesReducer(state = initialState, action: any){
    switch (action.type){
        case (MoviesActions.GET_MOVIES):
            return {
                ...state,
                movieList: [...action.payload],
                loading: false
            };
            case (MoviesActions.MOVIES_LOADING):
                return {
                   ...state,
                   loading: true
                };
            case (MoviesActions.MOVIES_FAILURE):
                return {
                    ...state,
                    loading: false
                };
            default: 
            return state;
    }
}