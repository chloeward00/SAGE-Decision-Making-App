import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import Link from '../../Link/Link';
import MatchedAPDialog from './MatchedActivityPlace';
import MatchedMovieDialog from './MatchedMovie';

export default function IndividualEventCard({ event, groupID, membersPicked, currentUserUID, groupMembersList }) {
    
    const { eventName, eventTime, eventDate, eventLocation, eventAdmin, eventCategory, eventID, imageURL, groupName, altText, adminPicks, movieType, longitude, latitude } = event;

    const activitySwipeRoute = `/categories/activity/options/${groupID}&${eventID}&${adminPicks}&lat=${latitude}&long=${longitude}`
    
    const foodSwipeRoute = `/categories/food/options/${groupID}&${eventID}&${adminPicks}&lat=${latitude}&long=${longitude}`

    const movieSwipeRoute = `/categories/movie/options/${groupID}&${eventID}&${movieType}&${adminPicks}`

    // this checks if all the members in the group have done the survey
    const arrayEqual = (array1, array2) => {
        if (array1.length === array2.length) {
            return array1.every(element => {
                if (array2.includes(element)) {
                    return true;
                }
            return false;
            });
        }
        
        return false;
    }

    // checks if the current user is an admin and all members in the group have done the survey
    // const showMatchingButton = currentUserUID == eventAdmin && arrayEqual(membersPicked, groupMembersList)
    const showMatchingButton = arrayEqual(membersPicked, groupMembersList)

    const movieDialog = eventCategory == 'movie'

    console.log('show movie dailogg  ', movieDialog)

    // console.log('sdsdsfffff ', membersPicked, groupMembersList)

    const surveySwipe = eventCategory == 'activity' ? activitySwipeRoute : eventCategory == 'food' ? foodSwipeRoute : movieSwipeRoute

    return (
        <Card sx={{ minWidth: 600 }} elevation={3}>
            {/* <CardMedia
                component="img"
                height="140"
                image={imageURL}        // this will be the result of the matching algorithm
                alt={altText}
            /> */}
            <CardHeader
                title={eventName}
                subheader={groupName}
            />
            <CardContent>
                <Typography variant="body1" color="text.secondary">
                    {"Category: " + eventCategory}
                </Typography>
                {/* <Typography variant="body2" color="text.secondary">
                    {"Where: " + eventLocation}
                </Typography> */}
                <Typography variant="body1" color="text.secondary">
                    {"When: " + eventDate}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {"Time: " + eventTime}
                </Typography>
            </CardContent>
            <CardActions>
                {!membersPicked.includes(currentUserUID) ? 
                    <Link href={surveySwipe} underline="none">
                        <Button size="small">DO SURVEY NOW</Button>
                    </Link>
                : null
                }
                {/* {showMatchingButton == true ?
                    <MatchedAPDialog eventName={eventName} eventID={eventID} groupID={groupID}/> 
                : null
                } */}
                {showMatchingButton == true ? 
                    movieDialog == true ? <MatchedMovieDialog eventName={eventName} eventID={eventID} groupID={groupID}/> 
                    : <MatchedAPDialog eventName={eventName} eventID={eventID} groupID={groupID}/> 
                    : null
                }
            </CardActions>
        </Card>
    );
}