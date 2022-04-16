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

const allEvents = [];
export default function IndividualEventCard({ event, groupID, membersPicked, currentUserUID }) {

    // const { eventName, eventDetails, imageURL, groupName, altText } = events;

    // IF THE EVENT IS ACTIVITY = BLUE, FOOD = PINK, MOVIE = PURPLE
    
    const { eventName, eventTime, eventDate, eventLocation, eventAdmin, eventCategory, eventID, imageURL, groupName, altText, adminPicks } = event;

    console.log("event details here   " + eventName)

    const activitySwipeRoute = `/categories/activity/options/${groupID}&${eventID}&${adminPicks}`
    const foodSwipeRoute = `/categories/food/options/${groupID}&${eventID}&${adminPicks}`
    const movieSwipeRoute = `/categories/movie/options/${groupID}&${eventID}&${adminPicks}`

    console.log("activ swpp ruteee   " + activitySwipeRoute)
    console.log('formatee datee hessseerr   ' + eventTime)

    
//     const fetchGroupData = async () => {

//         if (typeof eventTime === 'undefined'){
//              eventTime = eventTime ?? 'no input';
//         }

//         if(typeof eventDate ===  'undefined'){
//              eventDate = eventDate ?? 'Thu Apr 14 2022 00:00:00 GMT+0100 (Irish Standard Time)';
//         }

//         if(typeof eventName ===  'undefined'){
//             eventName= eventName ?? 'no input';
//        }
        
// //29 March 2022 at 00:00:00 UTC+1
// //
//         // console.log(eventDate,"rahrah")
//         // const dateArray = eventDate.split(",");
//         // console.log(dateArray, "idk")
//         // const monthDays = dateArray[1]

//         // const monthDay = monthDays.split(" ");

//         // console.log(monthDay, "crying")

//         if (eventDate != "Thu Apr 14 2022 00:00:00 GMT+0100 (Irish Standard Time)"){
//         const dateArray = eventDate.split(",");
//         const day1 = dateArray[0];
//         const day = day1.substring(0,3)
//         const month1 = dateArray[1];
//         const month2 = month1.split(" ");
        
//         // final month
//         const month3 = month2[1];
//         const month = month3.substring(0,3);
//         const year = dateArray[2];

//         const newEventString = day + " " + month + year + " GMT+0100 (Irish Standard Time)"
//         //Thu Apr 14 2022 00:00:00 GMT+0100 (Irish Standard Time)
//         console.log(newEventString, "niall")

        
//         //need to change to this

//         const eventTimeDate = new Date(newEventString);

//         console.log(eventTimeDate, "lawl");
//        // i have this 

//         //Friday, April 15, 2022
//         //const myTimestamp = fire.firestore().Timestamp.fromDate(newEventString);
//         // const created = firebase.firestore.Timestamp.fromDate(newEventString).toDate();
//         // console.log(created,"harry");

//         const javaScriptRelease = Date.parse("Thu Apr 14 2022 00:00:00 GMT+0100 (Irish Standard Time)");
//         console.log(javaScriptRelease,"java");

//         console.log(javaScriptRelease,"pls")

//        console.log(newEventString,"rahrah")
//         const event = {
//             Time: eventTime,
//             start: eventTimeDate,
//             title: eventName,
//             allDay: true
            
//         }
//         allEvents.push(event)

        

//         const db = fire.firestore();
//         db.collection("userEventsCal/"+currentUserUID+"/activities").add({event})
        
//     }else{

//         const eventTimeDate = new Date(eventDate);
//         const event = {
//             Time: eventTime,
//             start: eventTimeDate,
//             title: eventName,
//             allDay: true
            
//         }
//         allEvents.push(event)

//     }
        
//     }    
      
//     useEffect(() => {
//         let mounted = false
        
//         if(!mounted){
//             fetchGroupData();
           
//             }
                
//                  return () => {
//                      mounted = true
//                  }
            
//             }, [])


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
                {/* ADD THE ACTION HERE -- IF THE USER ID DOES NOT EXIST IN THE MEMBERPICKS COLLECTION, SHOW THE SURVEY */}
                {/* <Link href={`/groups/${groupID}/event/${eventID}`} underline="none"> */}
                {!membersPicked.includes(currentUserUID) ? 
                    <Link href={activitySwipeRoute} underline="none">
                        <Button size="small">DO SURVEY NOW</Button>
                    {/* <Button size="small">START MATCHING</Button> */}
                    </Link>
                : null
                }
                {/* remove this once the matching is over */}
                {currentUserUID == eventAdmin ? 
                    <Button size="small">START MATCHING</Button>
                : null
                }
            </CardActions>
        </Card>
    );
}