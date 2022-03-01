
import { Grid, Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import EventsCard from '../Events/EventsCard';
import fire from 'firebase/app'
import 'firebase/auth'

const useStyles = makeStyles((theme) => ({
    page: {
        padding: '50px'
    }
}))

const IndividualGroup = () => {

    const classes = useStyles();

    // this will eventually be changed by the data pulled from firebase
    // the events of a particular group

    const eventsList = [
        {
            eventName: "Movie Night",
            imageURL: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
            eventDetails: {
                when: 'Monday, 7th February',
                where: 'The Grayson'
            },
            altText: "some photo",
            onClick: () => router.push('/home')
        },
        {
            eventName: "Harry Styles Concert with Amigas",
            imageURL: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
            eventDetails: {
                when: 'Monday, 7th February',
                where: 'The Grayson'
            },            
            altText: "some photo",
            onClick: () => router.push('/groups')
        },
        {
            eventName: "Eat out with Big Brains",
            imageURL: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
            eventDetails: {
                when: 'Monday, 7th February',
                where: 'The Grayson'
            },
            altText: "some photo",
            onClick: () => router.push('/home/notifications')
        }
    ]

    console.log(fire.auth().currentUser.email)

    return (
        <Container className={classes.page}>
            <Grid container spacing={3}>
                {eventsList.map( event => (
                    <Grid key={event.eventName} item xs={12} md={6} lg={4}>
                        <EventsCard events={event}/>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
 
export default IndividualGroup;