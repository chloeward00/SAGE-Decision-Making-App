import React, { useState , useEffect } from "react";
import dynamic from "next/dynamic";
import 'firebase/firestore';
import 'firebase/firestore';
import fire from 'firebase/app'
import { makeStyles, useTheme } from '@mui/styles';
import { Button, Stack, Typography } from "@mui/material";
import { useRouter } from 'next/router'
import MapLeaflet from "../../components/Map/MapLeaflet.js";

const MapLeafletDynamic = dynamic(() => import("../../components/Map/MapLeaflet.js"),{
    ssr: false,
});

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#A9B5DD', 
        minHeight: "100vh"
    }
}))

export default function Home() {
    
    const classes = useStyles();
    const router = useRouter();
    
    const urlParams = router.query.index
    const urlCategory = urlParams.split('&')[0]
    const groupID = urlParams.split('&')[1]

    const[location, setLocation] = useState({ lng: 53.38332887514035, lat: -6.255555152893067 });       // DCU LOCATION

    const activitySwipeURL = '/categories/activity/' + groupID + '&' + 'lat=' + location.lat + '&' +'long=' + location.lng
    const foodSwipeURL = '/categories/food/' + groupID + '&' + 'lat=' + location.lat + '&' + 'long=' + location.lng

    // const activitySwipeURL = '/categories/activity/' + groupID + '&' + 'loc=' + location.lat + '&' + location.lng
    // const foodSwipeURL = '/categories/food/' + groupID + '&' + 'loc=' + location.lat + '&' + location.lng
    // console.log(urlCategory, groupID)

    const getData = async () => {

        let currentUserUID = fire.auth().currentUser.uid
      
        const db = fire.firestore();
        db.collection("LocationChoice")
        .doc(currentUserUID)
        .set({
            lat: location.lat,
            long: location.lng,
        })
    }

    useEffect(() => {
        let mounted = false

        if(!mounted){
            getData()
        }
        
        return () => {
            mounted = true
        }

    }, [location])

    console.log(location)

    return(
        <div className={classes.root}>
            <Stack direction="column" spacing={2}>
                <Typography align="center">
                    {urlCategory == 'activity' ? "Pick a location for your activity" : "Pick a location for a place to eat"}
                </Typography>
                <MapLeafletDynamic
                    center={location}
                    location={location}
                    draggable={true}
                    title="sample text"
                    onDragMarker={(e) => {
                        console.log("e",e);
                        let loc = {lat: e.lng, lng:e.lat};
                        setLocation(loc);
                    }}
                />
                <Button size="large" onClick={() => { urlCategory == 'activity' ? router.push(activitySwipeURL) : router.push(foodSwipeURL) }}>
                    {"Submit Location"}
                </Button>   
            </Stack> 
        </div>  
    );
}
