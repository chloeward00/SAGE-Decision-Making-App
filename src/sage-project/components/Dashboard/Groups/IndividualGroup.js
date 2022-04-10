
import { Grid, Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import EventsCard from '../Events/EventsCard';
import { useState, useEffect } from 'react';
import fire from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth'


const useStyles = makeStyles((theme) => ({
    page: {
        padding: '50px'
    }
}))

const IndividualGroup = ({ groupID }) => {

    const classes = useStyles();

    // const eventsList = [
    //     {
    //         eventName: "Movie Night",
    //         imageURL: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    //         eventDetails: {
    //             when: 'Monday, 7th February',
    //             where: 'The Grayson'
    //         },
    //         altText: "some photo",
    //         onClick: () => router.push('/home')
    //     },
    //     {
    //         eventName: "Harry Styles Concert with Amigas",
    //         imageURL: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    //         eventDetails: {
    //             when: 'Monday, 7th February',
    //             where: 'The Grayson'
    //         },            
    //         altText: "some photo",
    //         onClick: () => router.push('/groups')
    //     },
    //     {
    //         eventName: "Eat out with Big Brains",
    //         imageURL: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    //         eventDetails: {
    //             when: 'Monday, 7th February',
    //             where: 'The Grayson'
    //         },
    //         altText: "some photo",
    //         onClick: () => router.push('/home/notifications')
    //     }
    // ]


    const [groupsList, setGroupList] = useState([]);
    
    // isMounted is added to prevent memory leaks
    useEffect(() => {
        let isMounted = true;

        async function fetchData() {

            await fire.firestore()
            .collection("groupsCategory")
            .doc(groupID)
            .collection('events')
            .orderBy('createdAt', 'desc')
            .onSnapshot((querySnapshot) => {
                if(isMounted){
                    setGroupList(querySnapshot.docs.map(doc => doc.data()))
                }
            });
        }

        fetchData();

        return () => {
            isMounted = false
        }

    }, []);

    console.log("events listt deets here " + groupsList)

    return (
        <Container className={classes.page}>
            <Grid container spacing={3}>
                {groupsList.map( event => (
                    <Grid key={event.eventID} item xs={12} md={6} lg={4}>
                        <EventsCard events={event} groupID={groupID}/>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
 
export default IndividualGroup;


// PULL THE FIREBASE DATA HERE FROM THE GROUPSCATEGORY COLLECTION, BASICALLY JUST TAKE
// THE EVENTS COLLECTION SINCE THE EVENT ID IS UNIQUE