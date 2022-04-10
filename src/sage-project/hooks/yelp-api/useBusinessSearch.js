
import { useState, useEffect } from "react";
import * as api from './api';


const categories = "nightlife"
const location = "ireland"

export function useBusinessSearch({ categoriesAdmin }) {

    const [businesses, setBusinesses] = useState([]);
    const [amountResults, setAmountResults] = useState();
    const [searchParams, setSearchParams] = useState(categoriesAdmin);

    useEffect(() => {

        setBusinesses([]); 

        const fetchData = async () => {
            try {
                const rawData = await axios.get(`https://sage-app-decision.herokuapp.com/https://api.yelp.com/v3/businesses/search?categories=${categoriesAdmin}&location=ireland`, config)
                const resp = await rawData.json();
                console.log("LEST TRYY THISSS " + resp.businesses)
                setBusinesses(resp.businesses);
                setAmountResults(resp.total);
            } catch(e) {
                console.error(e);
            }
        };

        fetchData();
        
    }, [searchParams]);
     
    return [businesses, amountResults, searchParams, setSearchParams];
}