
import axios from "axios";
import { API_BASE_URL, BEARER_TOKEN} from './config';

const config = {
    headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
    },
};

export function getYELPData({groupID, eventID, categoriesAdmin}) {

    // need to pass location here TBD CHLOE
    let listCategories = categoriesAdmin.toString()

    console.log('PRINTING IN YELP API THE GR ID AND EID   ' + groupID, eventID, categoriesAdmin)
    console.log("TO STRING LISTSS HERE WE GO   " + listCategories)
    
    return axios.get(`https://sage-app-decision.herokuapp.com/https://api.yelp.com/v3/businesses/search?categories=${listCategories}&location=ireland`, config)
        .then(response => 
        response.data.businesses.map(({ id, name, image_url, rating, review_count, location }) => ({
            name: `${name}`,
            imgUrl: `${image_url}`,
            rating: `${rating}`,
            reviewCount: `${review_count}`,
            location: `${location}`,
        })))
}
