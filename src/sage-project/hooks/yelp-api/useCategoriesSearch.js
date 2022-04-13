
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
    
    return axios.get(`https://sage-app-decision.herokuapp.com/https://api.yelp.com/v3/businesses/search?categories=${listCategories}&location=ireland&limit=3`, config)
    .then(response => 
        response.data.businesses.map(({name, image_url, id}) => ({
            name: `${name}`,
            imgUrl:  `${image_url}`,
            //ID:  `${id}`,
    })))
}
