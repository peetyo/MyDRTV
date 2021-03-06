import { SearchPipe } from './search.pipe';

describe('SearchPipe', () => {

  let pipe: SearchPipe;

  beforeEach(()=>{
    pipe = new SearchPipe();
  });

  let movies = [
    {
      duration:181,
      genres:["action","adventure","sci-fi"],
      keywords:["superhero","marvel","time travel"],
      actors:["Robert Downey Jr.","Chris Evans","Chris Hemsworth", "Benedict Cumberbatch"],
      movie_id:"IugxR4BNj1hlhc38M547",
      star_rating: 8.8,
      thumbnail_url: "thumbnail_avengers_endgame.jpg",
      title:"Avengers: Endgame"},
    {
      duration:121,
      genres:["action","comedy","thriller"],
      keywords:["superhero","witty","time travel"],
      actors:["Robert Downey Jr.","Chris Evans","Chris Hemsworth"],
      movie_id:"IugxR4BNj1hlhc38M533",
      star_rating: 6.8,
      thumbnail_url: "thumbnail_oceans_8.jpg",
      title:"Ocean's 8"},
    {
      duration:141,
      genres:["thriller","sci-fi","crime"],
      keywords:["superhero","marvel","time travel"],
      actors:["Robert Downey Jr.","Chris Evans","Chris Hemsworth"],
      movie_id:"IugxR4BNj1hlhsdax533",
      star_rating: 6.8,
      thumbnail_url: "thumbnail_ghost.jpg",
      title:"Ghost"},
      {
      duration:164,
      genres:["thriller","sci-fi","crime"],
      keywords:["superhero","marvel","time travel"],
      actors:["Robert Downey Jr.","Chris Evans","Chris Hemsworth"],
      movie_id:"IugxR4BNj1hlhsdax533",
      star_rating: 2.8,
      thumbnail_url: "thumbnail_ghost.jpg",
      title:"Ghost: Second Attack"}
  ]

  it('Create an instance', () => {
    const pipe = new SearchPipe();
    expect(pipe).toBeTruthy();
  });

  it('Should return matching movie titles', () => {
    expect(pipe.transform(movies, "avengers"))
    .toEqual([
      {
        duration:181,
        genres:["action","adventure","sci-fi"],
        keywords:["superhero","marvel","time travel"],
        actors:["Robert Downey Jr.","Chris Evans","Chris Hemsworth", "Benedict Cumberbatch"],
        movie_id:"IugxR4BNj1hlhc38M547",
        star_rating: 8.8,
        thumbnail_url: "thumbnail_avengers_endgame.jpg",
        title:"Avengers: Endgame"
      }
      ]);
  });

  it('Should return matching movie titles regardless of case', () => {
    expect(pipe.transform(movies, "AveNgers"))
    .toEqual([
      {
        duration:181,
        genres:["action","adventure","sci-fi"],
        keywords:["superhero","marvel","time travel"],
        actors:["Robert Downey Jr.","Chris Evans","Chris Hemsworth", "Benedict Cumberbatch"],
        movie_id:"IugxR4BNj1hlhc38M547",
        star_rating: 8.8,
        thumbnail_url: "thumbnail_avengers_endgame.jpg",
        title:"Avengers: Endgame"
      }
      ]);
  });

  it('Should return all movies "" (empty string)', () => {
    expect(pipe.transform(movies, ""))
    .toEqual(movies);
  });

  it('Should return all movies  "    " (empty string)', () => {
    expect(pipe.transform(movies, "  "))
    .toEqual(movies);
  });

  it('Should return all matching movies based on title', () => {
    expect(pipe.transform(movies, "gHost"))
    .toEqual([
      {
        duration:141,
        genres:["thriller","sci-fi","crime"],
        keywords:["superhero","marvel","time travel"],
        actors:["Robert Downey Jr.","Chris Evans","Chris Hemsworth"],
        movie_id:"IugxR4BNj1hlhsdax533",
        star_rating: 6.8,
        thumbnail_url: "thumbnail_ghost.jpg",
        title:"Ghost"},
      {
        duration:164,
        genres:["thriller","sci-fi","crime"],
        keywords:["superhero","marvel","time travel"],
        actors:["Robert Downey Jr.","Chris Evans","Chris Hemsworth"],
        movie_id:"IugxR4BNj1hlhsdax533",
        star_rating: 2.8,
        thumbnail_url: "thumbnail_ghost.jpg",
        title:"Ghost: Second Attack"}
      ]);
  });

  it('Should return all matching movies based on genre', () => {
    expect(pipe.transform(movies, "sci-fi"))
    .toEqual([
      {
        duration:181,
        genres:["action","adventure","sci-fi"],
        keywords:["superhero","marvel","time travel"],
        actors:["Robert Downey Jr.","Chris Evans","Chris Hemsworth", "Benedict Cumberbatch"],
        movie_id:"IugxR4BNj1hlhc38M547",
        star_rating: 8.8,
        thumbnail_url: "thumbnail_avengers_endgame.jpg",
        title:"Avengers: Endgame"},
      {
        duration:141,
        genres:["thriller","sci-fi","crime"],
        keywords:["superhero","marvel","time travel"],
        actors:["Robert Downey Jr.","Chris Evans","Chris Hemsworth"],
        movie_id:"IugxR4BNj1hlhsdax533",
        star_rating: 6.8,
        thumbnail_url: "thumbnail_ghost.jpg",
        title:"Ghost"},
      {
        duration:164,
        genres:["thriller","sci-fi","crime"],
        keywords:["superhero","marvel","time travel"],
        actors:["Robert Downey Jr.","Chris Evans","Chris Hemsworth"],
        movie_id:"IugxR4BNj1hlhsdax533",
        star_rating: 2.8,
        thumbnail_url: "thumbnail_ghost.jpg",
        title:"Ghost: Second Attack"}
      ]);
  });

  it('Should return all matching movies based on actor', () => {
    expect(pipe.transform(movies, "Cumberbatch"))
    .toEqual([
      {
        duration:181,
        genres:["action","adventure","sci-fi"],
        keywords:["superhero","marvel","time travel"],
        actors:["Robert Downey Jr.","Chris Evans","Chris Hemsworth", "Benedict Cumberbatch"],
        movie_id:"IugxR4BNj1hlhc38M547",
        star_rating: 8.8,
        thumbnail_url: "thumbnail_avengers_endgame.jpg",
        title:"Avengers: Endgame"}
      ]);
  });

  it('Should return all matching movies based on keyword', () => {
    expect(pipe.transform(movies, "Witty"))
    .toEqual([
      {
        duration:121,
        genres:["action","comedy","thriller"],
        keywords:["superhero","witty","time travel"],
        actors:["Robert Downey Jr.","Chris Evans","Chris Hemsworth"],
        movie_id:"IugxR4BNj1hlhc38M533",
        star_rating: 6.8,
        thumbnail_url: "thumbnail_oceans_8.jpg",
        title:"Ocean's 8"}
      ]);
  });
});