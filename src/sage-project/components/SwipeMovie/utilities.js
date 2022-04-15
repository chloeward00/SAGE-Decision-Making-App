export function debounce(callback, wait) {
    let timerId;
    return (...args) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        callback(...args);
      }, wait);
    };
  }
  
  export function getLocalViewedProfiles() {
    return JSON.parse(localStorage.getItem("viewedProfiles")) || [];
  }
  
  export function setLocalViewedProfiles(viewedProfiles) {
    localStorage.setItem("viewedProfiles", JSON.stringify(viewedProfiles));
  }
  
  export function skimProfileData(rawData) {
    return rawData.map(({ original_title, poster_path, overview, genres, release_date,popularity }) => ({
      name: `${original_title}`,
      imgUrl:  `https://image.tmdb.org/t/p/w500${poster_path}`,
      overView: `${overview}`,
      genres: `${genres}`,
      releaseDate: `${release_date}`,
      
    })); 
  }

  