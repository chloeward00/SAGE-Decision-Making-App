import { skimProfileData } from "../utilities";

// based on user survey will input the selected one into the api
const action = 28;
const Adventure = 12;
const Animation = 16;
const Comedy = 35;
const Crime = 80;
const Documentary = 99;
const Drama = 18;
const Family = 10751;
const Fantasy = 14;
const History = 36;
const Horror = 27;
const Music = 10402;
const TvMovie = 10770;
const Thriller = 53;
const War = 10752;
const Western = 37;
const Mystery = 9648;
const Romance = 10749;
const ScienceFiction = 878;

const api_key = "637ebc34a12fc235b39c60d6e3889d59";
// const genre_API = "https://api.themoviedb.org/3/discover/movie?api_key=637ebc34a12fc235b39c60d6e3889d59&language=en-US&sort_by=popularity.desc&include_adult=false&with_genres="
// function App() {

//     const [movies, setMovies] = useState([]);

//     useEffect(() => {

//         fetch(genre_API + Romance)
//         .then((res) => res.json())
//         .then((data) => {
//             console.log(data);
//             setMovies(data.results);
//         });

//     }, [])


export async function getProfilesData() {
  const response = await fetch("https://api.themoviedb.org/3/discover/movie?api_key=637ebc34a12fc235b39c60d6e3889d59&language=en-US&sort_by=popularity.desc&include_adult=false&with_genres=10749&Page1");
  const { results } = await response.json();
  return skimProfileData(results);
}

