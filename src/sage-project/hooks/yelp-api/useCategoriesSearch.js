
import axios from "axios";
import { API_BASE_URL, BEARER_TOKEN} from './config';
import 'firebase/firestore';
import 'firebase/auth'
import fire from 'firebase/app'
import { useEffect, useState } from 'react';
import { useRouter } from "next/router";
// import {getQueryParams} from "../../components/Categories/ActivityDialog" 

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

// console.log(getQueryParams())

const getCategories = () => {
    
    const [categories, setCategories] = useState([]);

    useEffect(() => {

        let isMounted = true;
    
        async function fetchData() {
            
            await fire.firestore().collection('groupsCategory').doc("gR9oBCAoDGWjLINC8UoV").collection(fire.auth().currentUser.uid)
            .onSnapshot(snapshot => {
                if(isMounted){
                    setCategories(snapshot.docs.map( doc => doc.data().categoryTerms))
                }
            })
        }
    
        fetchData();
    
        return () => {
            isMounted = false
        }
    });
}

// console.log("get query params here  " + getQueryParams())
// const router = useRouter()
// console.log("THIS IS THE CURRENT PATH" + router.pathname)

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

