import { skimProfileData } from "../utilities";

export async function getProfilesData() {
  const response = await fetch("https://api.themoviedb.org/3/discover/movie?api_key=637ebc34a12fc235b39c60d6e3889d59&language=en-US&sort_by=popularity.desc&include_adult=false&with_genres=10749&Page1");
  const { results } = await response.json();
  return skimProfileData(results);
}

