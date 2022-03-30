
import axios from "axios";
import { API_BASE_URL, BEARER_TOKEN} from './config';
import { useEffect } from "react";


const config = {
    headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
    },
};

// if(navigator.geolocation){
//     navigator.geolocation.getCurrentPosition(function(position) {
//         console.log("xxxxxxx  Latitude is :", position.coords.latitude);
//         console.log("xxxxxxxx  Longitude is :", position.coords.longitude);
//     });
// }

export async function getYELPData() {

    // return axios.get(`${API_BASE_URL}?categories=zoos&location=ireland`, config)
    // return axios.get(`${API_BASE_URL}?categories=${getQueryParams()}`, config)
    // return axios.get('https://sage-app-decision.herokuapp.com/https://api.yelp.com/v3/businesses/search?categories=zoos&location=ireland', config)
    return axios.get('https://sage-app-decision.herokuapp.com/https://api.yelp.com/v3/businesses/search?categories=zoos&location=ireland', config)

    .then(response => 
        response.data.businesses.map(({name, image_url}) => ({
            name: `${name}`,
            imgUrl:  `${image_url}`,
    })))
}

