
import { Typography, Grid, Button, Divider, Container, Box, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import TopMatchedEventCard from './TopMatchEventCard';
import { useState, useEffect } from 'react';
import 'firebase/firestore';
import 'firebase/auth'
import fire from 'firebase/app'


const useStyles = makeStyles((theme) => ({
    page: {
        // margin: 'auto',
        // margin: theme.spacing(5),
        // backgroundColor: 'yellow',
    },
    grid: {
        margin: 'auto',
        paddingBottom: theme.spacing(2)
    }
}))

const Events = () => {

    const classes = useStyles();
    const userID = fire.auth().currentUser.uid
    const [allUserEvents, setAllUserEvents] = useState([])
    const [upcomingEvents, setUpcomingEvents] = useState([])
    const [membersPicked, setMembersPicked] = useState([])
    const [groupList, setGroupList] = useState([])

    useEffect(() => {

        let isMounted = true;

        async function fetchAllEventID() {

            await fire.firestore()
            .collection('users')
            .doc(userID)
            .onSnapshot(snapshot => {
                if(isMounted){
                    setAllUserEvents(snapshot.data().userEvents.map(event => event))
                    // console.log('getting all the user events hereee  ', snapshot.data().userEvents)
                }
            })
        }

        fetchAllEventID()

        return () => {
            isMounted = false 
        }
    }, []);


    useEffect(() => {
        let isMounted = true;

        async function fetchAllUpcomingEvents() { 
            // console.log('check if all events id are rendered here   ', allUserEvents)
            for (const event of allUserEvents){
                // console.log('check eventtt heree  ', event)
                await fire.firestore()
                .collection('groupTopMatch')
                .doc(event)
                .onSnapshot(snapshot => {
                    if(isMounted){
                        setUpcomingEvents( arr => [...arr, snapshot.data()])
                    }
                })
            }
        }

        fetchAllUpcomingEvents()
        
        return () => {
            isMounted = false 
        };
    }, [allUserEvents]);

    console.log('sffdf  ', upcomingEvents)

    return (
        <Container className={classes.page}>
            <Grid container spacing={3} className={classes.grid}>
                {upcomingEvents.map(event => (
                    <Grid key={event.solution.name} item xs={12} md={6} lg={4}>
                        <TopMatchedEventCard events={event}/>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
 
export default Events;