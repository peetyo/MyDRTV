    
import * as fromMovieList from './movie-list.reducer';
import * as types from './movie-list.actions';
var deepFreeze = require('deep-freeze');

describe('MovieList Reducer', () => {
    let state;

    beforeEach(()=>{
        state = {
            movieList: [],
            loading: false
        };
    });

    it('Should return the initial movieList state', () => {
        expect(fromMovieList.moviesReducer(undefined, {})).toEqual(state);
    });

    it('Should start loading', () => {
        deepFreeze(state);
        
        expect( fromMovieList.moviesReducer(state, { type: types.MOVIES_LOADING }))
        .toEqual({
            ...state,
            loading: true
        });
    });

    it('Should stop loading on failure', () => {
        state.loading = true;
        deepFreeze(state);
        
        expect( fromMovieList.moviesReducer(state, { type: types.MOVIES_FAILURE }))
        .toEqual({
            ...state,
            loading: false
        });
    });

    it('Should get movies data', () => {
        deepFreeze(state);
        
        expect( fromMovieList.moviesReducer(state, { type: types.GET_MOVIES, 
            payload: [
                {"id":"0NRkOZz2h7B34PhZrWj8","actors":["Robert Downey Jr.","Chris Evans","Chris Hemsworth","Scarlett Johansson","Benedict Cumberbatch","Tom Hiddleston","Bradley Cooper","Brie Larson","Samuel L. Jackson","Josh Brolin"],"duration":181,"genres":["action","adventure","sci-fi"],"keywords":["superhero","marvel","avengers","time travel"],"movie_id":"IugxR4BNj1hlhc38M547","star_rating":8.8,"thumbnail_url":"thumbnail_avengers_endgame.jpg","title":"Avengers: Endgame"},
                {"id":"AlXPcGSU21ZAv5yQbS45","actors":["Sandra Bullock","Cate Blanchett","Anne Hathaway","Helena Bonham Carter","Rihanna"],"duration":110,"genres":["action","comedy","crime","thriller"],"keywords":["witty","long con","girl power"],"movie_id":"42vvaXNnA5osoVSFd3HJ","star_rating":6.2,"thumbnail_url":"thumbnail_oceans_8.jpg","title":"Ocean's Eight"}
            ]
        }))
        .toEqual({
            movieList:[
            {"id":"0NRkOZz2h7B34PhZrWj8","actors":["Robert Downey Jr.","Chris Evans","Chris Hemsworth","Scarlett Johansson","Benedict Cumberbatch","Tom Hiddleston","Bradley Cooper","Brie Larson","Samuel L. Jackson","Josh Brolin"],"duration":181,"genres":["action","adventure","sci-fi"],"keywords":["superhero","marvel","avengers","time travel"],"movie_id":"IugxR4BNj1hlhc38M547","star_rating":8.8,"thumbnail_url":"thumbnail_avengers_endgame.jpg","title":"Avengers: Endgame"},
            {"id":"AlXPcGSU21ZAv5yQbS45","actors":["Sandra Bullock","Cate Blanchett","Anne Hathaway","Helena Bonham Carter","Rihanna"],"duration":110,"genres":["action","comedy","crime","thriller"],"keywords":["witty","long con","girl power"],"movie_id":"42vvaXNnA5osoVSFd3HJ","star_rating":6.2,"thumbnail_url":"thumbnail_oceans_8.jpg","title":"Ocean's Eight"}
            ],
            loading: false
        });
    });

})