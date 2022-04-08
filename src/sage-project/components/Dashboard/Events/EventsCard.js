import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';

export default function EventsCard({ events }) {

    // const { eventName, eventDetails, imageURL, groupName, altText } = events;
    
    const { eventName, eventDetails, eventDate, eventCategory, eventID, imageURL, groupName, altText } = events;

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
                    {"Where: " + eventDetails.where}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {"When: " + eventDetails.when}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {"Time: " + eventDetails.time}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">SEE MORE</Button>
            </CardActions>
        </Card>
    );
}