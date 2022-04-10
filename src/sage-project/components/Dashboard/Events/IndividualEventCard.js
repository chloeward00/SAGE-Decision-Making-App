import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import Link from '../../Link/Link';

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