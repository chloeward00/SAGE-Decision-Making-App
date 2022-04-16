import { skimProfileData } from "./utility";

const api_key = "637ebc34a12fc235b39c60d6e3889d59";

export async function getMovieData ({ movieType, genres }) {

    console.log('mov typee  ' + movieType)
    console.log('genereeee   ' + genres)

    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieType}?api_key=${api_key}&include_adult=false&with_genres=${genres}&Page1`);
    const { results } = await response.json();
    
    return skimProfileData(results);
}
