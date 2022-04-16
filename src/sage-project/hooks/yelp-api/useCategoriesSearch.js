
import axios from "axios";
import { API_BASE_URL, BEARER_TOKEN} from './config';

const config = {
    headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
    },
};

export function getYELPData({ groupID, eventID, categoriesAdmin, latitudeValue, longitudeValue}) {

    // need to pass location here TBD CHLOE
    let listCategories = categoriesAdmin.toString()
    
    return axios.get(`https://sage-app-decision.herokuapp.com/https://api.yelp.com/v3/businesses/search?categories=${listCategories}&longitude=${latitudeValue}&latitude=${longitudeValue}`, config)
        .then(response => 
        response.data.businesses.map(({ id, name, image_url, rating, review_count, location}) => ({
            name: `${name}`,
            imgUrl: `${image_url}`,
            rating: `${rating}`,
            reviewCount: `${review_count}`,
            location: `${location.display_address}`,
        })))
}
