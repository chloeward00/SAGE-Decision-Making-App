import { yelpAPIKey } from '../YelpAPI.js';
import axios from "axios";
import { get } from "react-hook-form";

 const config = {
   headers: {
     Authorization: 'Bearer ' + yelpAPIKey,
   },
 };


   // Set radius from current location as 4 km.
   const radius = 10;
   // Set limit for number of places as 30.
   const limit = 15;

   // storing latitude and longitude in these lists
  const lati = [];
  const longi = []


    navigator.geolocation.getCurrentPosition(function(position) {
        
       lati.push(position.coords.latitude);
       longi.push(position.coords.longitude);
    
});

export async function getProfilesData() {
 
   return axios.get('https://sage-app-decision.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=pizza&latitude=' +
   (lati[0]) + 
   '&longitude=' +
   (longi[0]) +
   '&limit=' +
   limit,
   config)

 .then(response => 
    response.data.businesses.map(({name,image_url}) => ({
        name: `${name}`,
        imgUrl:  `${image_url}`,
    })))
   
}
