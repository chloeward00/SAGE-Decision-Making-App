import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import Link from '../../Link/Link';

export default function EventsCard({ events, groupID }) {
    
    const { eventName, eventTime, eventDate, eventLocation, eventCategory, eventID, imageURL, groupName, altText } = events;

    return (
        <Card sx={{ maxWidth: 340 }} elevation={3}>
        
            <CardMedia
                component="img"
                height="140"
                image={imageURL}
                alt={altText}
            />
            <CardHeader
                title={eventName}
                subheader={eventCategory}
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