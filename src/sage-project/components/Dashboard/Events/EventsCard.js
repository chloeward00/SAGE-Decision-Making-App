import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import Link from '../../Link/Link';
import { useEffect, useState } from 'react';
import 'firebase/firestore';
import fire from 'firebase/app';
import * as firebase from 'firebase/app'




export default function EventsCard({ events, groupID }) {

    const allEvents = [];
    // const { eventName, eventDetails, imageURL, groupName, altText } = events;

    // IF THE EVENT IS ACTIVITY = BLUE, FOOD = PINK, MOVIE = PURPLE
    
    const { eventName, eventTime, eventDate, eventLocation, eventCategory, eventID, imageURL, groupName, altText } = events;


    const fetchGroupData = async () => {

        if (typeof eventTime === 'undefined'){
             eventTime = eventTime ?? 'no input';
        }

        if(typeof eventDate ===  'undefined'){
             eventDate = eventDate ?? 'Thu Apr 14 2022 00:00:00 GMT+0100 (Irish Standard Time)';
        }

        if(typeof eventName ===  'undefined'){
            eventName = eventName ?? 'no input';
       }

    
        
//29 March 2022 at 00:00:00 UTC+1
//
        // console.log(eventDate,"rahrah")
        // const dateArray = eventDate.split(",");
        // console.log(dateArray, "idk")
        // const monthDays = dateArray[1]

        // const monthDay = monthDays.split(" ");

        // console.log(monthDay, "crying")

        if (eventDate != "Thu Apr 14 2022 00:00:00 GMT+0100 (Irish Standard Time)"){
        const dateArray = eventDate.split(",");
        const day1 = dateArray[0];
        const day = day1.substring(0,3)
        const month1 = dateArray[1];
        const month2 = month1.split(" ");
        const date3 = month2[2];

        console.log(month2,"harreh")
        
        // final month
         const month3 = month2[1];
         const month = month3.substring(0,3);
        const year = dateArray[2];

        const newEventString = day + " " +  month + " " + date3 + year + " GMT+0100 (Irish Standard Time)"
        //Thu Apr 14 2022 00:00:00 GMT+0100 (Irish Standard Time)
      
        console.log(newEventString,"idk")

        
        //need to change to this

        const eventTimeDate = new Date(newEventString);
        console.log(eventTimeDate,"maybe")

        console.log(eventTimeDate, "lawl");
       // i have this 

        //Friday, April 15, 2022
        //const myTimestamp = fire.firestore().Timestamp.fromDate(newEventString);
        // const created = firebase.firestore.Timestamp.fromDate(newEventString).toDate();
        // console.log(created,"harry");

        const javaScriptRelease = Date.parse("Thu Apr 14 2022 00:00:00 GMT+0100 (Irish Standard Time)");
        console.log(javaScriptRelease,"java");

        console.log(javaScriptRelease,"pls")
       
       console.log(newEventString,"rahrah")
        const event = {
            id: Math.random().toString(36).slice(2),
            Time: eventTime,
            start: eventTimeDate,
            title: eventName,
            allDay: true
            
        }
    
        allEvents.push(event)

        console.log(allEvents,"cry")

        
        const currentUserUID = fire.auth().currentUser.uid
        const db = fire.firestore();
        
      //  db.collection("userEventsCal/"+currentUserUID+"/activities").add({event})
        db.collection("userEventsCal5/"+currentUserUID+"/event" +currentUserUID).add({event})

        // using this one
        db.collection("userEventsCal6").doc(currentUserUID).collection("events").doc(currentUserUID).set({event: allEvents})
        
    }else{

        const eventTimeDate = new Date(eventDate);
        const event = {
            Time: eventTime,
            start: eventTimeDate,
            title: eventName,
            allDay: true
            
        }
        allEvents.push(event)

    }
        
    }    
      
    useEffect(() => {
        let mounted = false
        
        if(!mounted){
            fetchGroupData();
           
            }
                
                 return () => {
                     mounted = true
                 }
            
            }, [])


    return (
        <Card sx={{ maxWidth: 340 }} elevation={3}>
            <CardMedia
                component="img"
                height="140"
                image={imageURL}        // this will be the result of the matching algorithm
                alt={altText}
            />
            <CardHeader
                title={eventName}
                subheader={groupName}
            />
            <CardContent>
            <Typography variant="body2" color="text.secondary">
                    {"Where: " + eventLocation}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {"When: " + eventDate}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {"Time: " + eventTime}
                </Typography>
            </CardContent>
            <CardActions>
                <Link href={`/groups/${groupID}/event/${eventID}`} underline="none">
                    <Button size="small">OPEN</Button>
                </Link>
            </CardActions>
        </Card>
    );
}