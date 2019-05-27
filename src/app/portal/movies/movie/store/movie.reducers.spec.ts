    
import * as fromMovie from './movie.reducers';
import * as types from './movie.actions';
var deepFreeze = require('deep-freeze');

describe('Movie Reducer', () => {
    let state;

    beforeEach(()=>{
        state = {
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
            youtube_code: null,
            reviews: [],
            loading: false
        };
      });

    it('Should return the initial movie state', () => {
        expect(fromMovie.movieReducer(undefined, {})).toEqual(state);
    });

    it('Should reset movie state', () => {
    state = {
        actors:["Sandra Bullock","Cate Blanchett","Anne Hathaway","Helena Bonham Carter","Rihanna"],
        date_added:{"seconds":1558130400,"nanoseconds":0},
        directors:["Gary Ross"],
        duration:110,
        genres:["action","comedy","crime","thriller"],
        hero_img_url:"hero_oceans_8.jpg",
        keywords:["witty","long con","girl power"],
        pg_rating:"12A",
        release_year:2018,
        star_rating:6.2,
        storyline:"Danny Ocean's estranged sister Debbie attempts to pull off the heist of the century at New York City's star-studded annual Met Gala. Her first stop is to assemble the perfect all-female crew: Lou, Rose, Daphne Kluger, Nine Ball, Tammy, Amita, and Constance.",
        title:"Ocean's Eight",
        youtube_code: "xxx",
        reviews: [{"id":"IJMgTJfSU0DPItsUgTzc","contains_spoilers":false,"content":"This movie lacked personality. You didn't get the character development that it needed. The heist was good but lacked suspense. It ended pretty abruptly. It could have used more humor.","created_on":{"seconds":1558130400,"nanoseconds":0},"headline":"Ocean's 8? More like Ocean's Eh","star_rating":6,"username":"leooconnorjr"}],
        loading: false}
    deepFreeze(state);
    
    expect( fromMovie.movieReducer(state, { type: types.CLEAR_MOVIE }))
        .toEqual({
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
            youtube_code: null,
            reviews: [],
            loading: false
        });
    });

    it('Should start loading', () => {
        deepFreeze(state);
        
        expect( fromMovie.movieReducer(state, { type: types.MOVIE_LOADING }))
        .toEqual({
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
            youtube_code: null,
            reviews: [],
            loading: true
        });
    });

    it('Should stop loading on failure', () => {
        state.loading = true;
        deepFreeze(state);
        
        expect( fromMovie.movieReducer(state, { type: types.MOVIE_FAILURE }))
        .toEqual({
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
            youtube_code: null,
            reviews: [],
            loading: false
        });
    });

    it('Should get movie reviews', () => {
        // Prior to getting the movie data the loading state is set to true
        // when the data has been loaded the loading should stop (false)
        state = {actors: [],
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
            reviews: [],
            loading: true}
        deepFreeze(state);
        
        expect( fromMovie.movieReducer(state, { type: types.GET_REVIEWS, 
            payload: [{id:"IJMgTJfSU0DPItsUgTzc",
            contains_spoilers:false,
            content:"This movie lacked personality.",
            created_on:{"seconds":1558130400,"nanoseconds":0},
            headline:"Ocean's 8? More like Ocean's Eh",
            star_rating:6,
            username:"leooconnorjr"}]
        }))
        .toEqual({
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
            reviews: [{"id":"IJMgTJfSU0DPItsUgTzc","contains_spoilers":false,"content":"This movie lacked personality.","created_on":{"seconds":1558130400,"nanoseconds":0},"headline":"Ocean's 8? More like Ocean's Eh","star_rating":6,"username":"leooconnorjr"}],
            loading: false
        });
    });
    
    it('Should get movie data', () => {
        deepFreeze(state);
        
        expect( fromMovie.movieReducer(state, { type: types.GET_MOVIE, 
            payload:  {
                actors:["Sandra Bullock","Cate Blanchett","Anne Hathaway","Helena Bonham Carter","Rihanna"],
                date_added:{"seconds":1558130400,"nanoseconds":0},
                directors:["Gary Ross"],
                duration:110,
                genres:["action","comedy","crime","thriller"],
                hero_img_url:"hero_oceans_8.jpg",
                keywords:["witty","long con","girl power"],
                pg_rating:"12A",
                release_year:2018,
                star_rating:6.2,
                storyline:"Danny Ocean's estranged sister Debbie attempts to pull off the heist of the century at New York City's star-studded annual Met Gala. Her first stop is to assemble the perfect all-female crew: Lou, Rose, Daphne Kluger, Nine Ball, Tammy, Amita, and Constance.",
                title:"Ocean's Eight",
                youtube_code: "xxx",
                reviews: [{"id":"IJMgTJfSU0DPItsUgTzc","contains_spoilers":false,"content":"This movie lacked personality. You didn't get the character development that it needed. The heist was good but lacked suspense. It ended pretty abruptly. It could have used more humor.","created_on":{"seconds":1558130400,"nanoseconds":0},"headline":"Ocean's 8? More like Ocean's Eh","star_rating":6,"username":"leooconnorjr"}],
                loading: false}
        }))
        .toEqual( {
            actors:["Sandra Bullock","Cate Blanchett","Anne Hathaway","Helena Bonham Carter","Rihanna"],
            date_added:{"seconds":1558130400,"nanoseconds":0},
            directors:["Gary Ross"],
            duration:110,
            genres:["action","comedy","crime","thriller"],
            hero_img_url:"hero_oceans_8.jpg",
            keywords:["witty","long con","girl power"],
            pg_rating:"12A",
            release_year:2018,
            star_rating:6.2,
            storyline:"Danny Ocean's estranged sister Debbie attempts to pull off the heist of the century at New York City's star-studded annual Met Gala. Her first stop is to assemble the perfect all-female crew: Lou, Rose, Daphne Kluger, Nine Ball, Tammy, Amita, and Constance.",
            title:"Ocean's Eight",
            youtube_code: "xxx",
            reviews: [{"id":"IJMgTJfSU0DPItsUgTzc","contains_spoilers":false,"content":"This movie lacked personality. You didn't get the character development that it needed. The heist was good but lacked suspense. It ended pretty abruptly. It could have used more humor.","created_on":{"seconds":1558130400,"nanoseconds":0},"headline":"Ocean's 8? More like Ocean's Eh","star_rating":6,"username":"leooconnorjr"}],
            loading: false});
    });


})