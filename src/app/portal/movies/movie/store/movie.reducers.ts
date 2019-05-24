import * as MovieActions from './movie.actions';

export interface State {
    actors: [];
    date_added: string;
    directors:[];
    duration: number;
    genres: [];
    hero_img_url: string;
    keywords: [];
    pg_rating: string;
    release_year: number;
    star_rating: number;
    storyline: string;
    title: string;
    reviews: [];
}
const initialState: State = {
    actors: [],
    date_added: null,
    directors:[],
    duration: null,
    genres: [],
    hero_img_url: null,
    keywords: [],
    pg_rating: null,
    release_year: null,
    star_rating: null,
    storyline: null,
    title: null,
    reviews: []
}

export function authReducer(state = initialState, action: any){
    switch (action.type){
        case (MovieActions.GET_MOVIE):
            return {
                ...state,
                ...action.payload
            };
        default: 
            return state;
    }
}