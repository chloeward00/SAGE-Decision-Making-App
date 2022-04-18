import React, { useState , useEffect } from "react";
import dynamic from "next/dynamic";
import 'firebase/firestore';
import 'firebase/firestore';
import fire from 'firebase/app'
import { makeStyles, useTheme } from '@mui/styles';
import { Button, Stack, Typography } from "@mui/material";
import { useRouter } from 'next/router'

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
    const groupAdmin = fire.auth().currentUser.uid

    // const [eventID, setEventID] = useState('')
    const [location, setLocation] = useState({ lng: 53.38332887514035, lat: -6.255555152893067 });       // DCU LOCATION

    const [groupList, setGroupList] = useState([])

    // const activitySwipeURL = '/categories/activity/' + groupID + '&' + eventID
    // const foodSwipeURL = '/categories/food/' + groupID + '&' + eventID
 
    const getData = () => {
      
        const db = fire.firestore();
        db.collection("LocationChoice")
        .doc(groupAdmin)
        .set({
            lat: location.lat,
            long: location.lng,
        })
    }

    const createEvent = () => {
        
        const docRef = fire.firestore()
        .collection('groupsCategory')
        .doc(groupID)
        .collection('events')
        .doc()

        docRef.set({
            groupEvent: '',             // this is the result after the matching -- name of the event
            eventImage: '',             // this will be pulled from the matching result
            eventCategory: urlCategory,
            eventDate: '',
            eventTime: '',
            eventLocation: '',
            eventName: docRef.id,    // this can be edited by the Admin only
            eventID: docRef.id,
            adminPicks: [],
            eventAdmin: groupAdmin,
            createdAt: new Date(),
            calendarDate: '',
            groupID: groupID,
            longitude: location.lng,
            latitude: location.lat,
        })
        .catch((err) => {
            alert(err)
            console.log(err)
        })

        updateUserEvents(docRef.id)

        urlCategory == 'activity' ? router.push('/categories/activity/' + groupID + '&' + docRef.id) : router.push('/categories/food/' + groupID + '&' + docRef.id)
    }

    const getGroupsList = () => {
        
        fire.firestore()
        .collection('groups')
        .doc(groupID)
        .onSnapshot(snapshot => {
            setGroupList(snapshot.data().groupMembers.map(member => member))
        })
    }

    const updateUserEvents = (eventID) => {

        for (const member of groupList){
            fire.firestore()
            .collection('users')
            .doc(member)
            .update({
                userEvents: fire.firestore.FieldValue.arrayUnion(eventID)
            })
            .catch((err) => {
                alert(err)
                console.log(err)
            })
        }
    }

    useEffect(() => {
        let mounted = false

        if(!mounted){
            getData()
            getGroupsList()
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
                <Button size="large" onClick={() => { 
                    createEvent()
                    }}>
                    {"Submit Location"}
                </Button>   
            </Stack> 
        </div>  
    );
}
