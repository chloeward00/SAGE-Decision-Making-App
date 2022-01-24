import React from 'react';

//const IMG_API = "https://api.themoviedb.org/3/movie/{movie_id}/images?api_key=637ebc34a12fc235b39c60d6e3889d59&language=en-US"

const IMG_API = "https://image.tmdb.org/t/p/original"

const Movie = ({title, poster_path, overview,vote_average, release_date}) => (

<div className="movie">
        <img src={IMG_API + poster_path} alt={title}/>
        <div className="movie-info">

            <h3>{title}</h3>
            <span>Rating: {vote_average} </span>
            <span>Release Date: {release_date} </span>
            <p>{overview} </p>
        </div>
    </div>
    );

export default Movie;

//aWeKITRFbbwY8txG5uCj4rMCfSP.jpg