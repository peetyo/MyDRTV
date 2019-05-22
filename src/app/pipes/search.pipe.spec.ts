import { SearchPipe } from './search.pipe';

fdescribe('SearchPipe', () => {

  let pipe: SearchPipe;

  beforeEach(()=>{
    pipe = new SearchPipe();
  });

  let movies = [
    {
      duration:181,
      genres:["action","adventure","sci-fi"],
      movie_id:"IugxR4BNj1hlhc38M547",
      star_rating: 8.8,
      thumbnail_url: "thumbnail_avengers_endgame.jpg",
      title:"Avengers: Endgame"},
    {
      duration:121,
      genres:["action","comedy","thriller"],
      movie_id:"IugxR4BNj1hlhc38M533",
      star_rating: 6.8,
      thumbnail_url: "thumbnail_oceans_8.jpg",
      title:"Ocean's 8"},
    {
      duration:141,
      genres:["thriller","sci-fi","crime"],
      movie_id:"IugxR4BNj1hlhsdax533",
      star_rating: 6.8,
      thumbnail_url: "thumbnail_ghost.jpg",
      title:"Ghost"},
      {
      duration:164,
      genres:["thriller","sci-fi","crime"],
      movie_id:"IugxR4BNj1hlhsdax533",
      star_rating: 2.8,
      thumbnail_url: "thumbnail_ghost.jpg",
      title:"Ghost: Second Attack"}
  ]

  fit('Create an instance', () => {
    const pipe = new SearchPipe();
    expect(pipe).toBeTruthy();
  });

  fit('Should return matching movie titles', () => {
    expect(pipe.transform(movies, "avengers"))
    .toEqual([
      {
        duration:181,
        genres:["action","adventure","sci-fi"],
        movie_id:"IugxR4BNj1hlhc38M547",
        star_rating: 8.8,
        thumbnail_url: "thumbnail_avengers_endgame.jpg",
        title:"Avengers: Endgame"
      }
      ]);
  });

  fit('Should return matching movie titles regardless of case', () => {
    expect(pipe.transform(movies, "AveNgers"))
    .toEqual([
      {
        duration:181,
        genres:["action","adventure","sci-fi"],
        movie_id:"IugxR4BNj1hlhc38M547",
        star_rating: 8.8,
        thumbnail_url: "thumbnail_avengers_endgame.jpg",
        title:"Avengers: Endgame"
      }
      ]);
  });

  fit('Should return all movies "" (empty string)', () => {
    expect(pipe.transform(movies, ""))
    .toEqual(movies);
  });

  fit('Should return all movies  "    " (empty string)', () => {
    expect(pipe.transform(movies, "  "))
    .toEqual(movies);
  });

  fit('Should return all matching movies based on title', () => {
    expect(pipe.transform(movies, "gHost"))
    .toEqual([
      {
        duration:141,
        genres:["thriller","sci-fi","crime"],
        movie_id:"IugxR4BNj1hlhsdax533",
        star_rating: 6.8,
        thumbnail_url: "thumbnail_ghost.jpg",
        title:"Ghost"},
      {
        duration:164,
        genres:["thriller","sci-fi","crime"],
        movie_id:"IugxR4BNj1hlhsdax533",
        star_rating: 2.8,
        thumbnail_url: "thumbnail_ghost.jpg",
        title:"Ghost: Second Attack"}
      ]);
  });

  fit('Should return all matching movies based on genre', () => {
    expect(pipe.transform(movies, "sci-fi"))
    .toEqual([
      {
        duration:181,
        genres:["action","adventure","sci-fi"],
        movie_id:"IugxR4BNj1hlhc38M547",
        star_rating: 8.8,
        thumbnail_url: "thumbnail_avengers_endgame.jpg",
        title:"Avengers: Endgame"},
      {
        duration:141,
        genres:["thriller","sci-fi","crime"],
        movie_id:"IugxR4BNj1hlhsdax533",
        star_rating: 6.8,
        thumbnail_url: "thumbnail_ghost.jpg",
        title:"Ghost"},
      {
        duration:164,
        genres:["thriller","sci-fi","crime"],
        movie_id:"IugxR4BNj1hlhsdax533",
        star_rating: 2.8,
        thumbnail_url: "thumbnail_ghost.jpg",
        title:"Ghost: Second Attack"}
      ]);
  });
});