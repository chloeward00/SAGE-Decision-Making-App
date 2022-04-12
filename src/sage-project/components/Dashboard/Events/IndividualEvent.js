
import { Grid, Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import IndividualEventCard from './IndividualEventCard';
import { useState, useEffect } from 'react';
import fire from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth'

const useStyles = makeStyles((theme) => ({
    page: {
        padding: '50px'
    }
}))

const IndividualEvent = ({ groupID, eventID, eventDetails, eventName }) => {

    const classes = useStyles();

    const [individualEvent, setIndividualEvent] = useState([]);
    const [membersPicked, setMembersPicked] = useState([])
    const currentUserUID = fire.auth().currentUser.uid

    // isMounted is added to prevent memory leaks
    useEffect(() => {
        let isMounted = true;

        async function fetchData() {

            await fire.firestore()
            .collection("groupsCategory")
            .doc(groupID)
            .collection('events')
            .doc(eventID)
            .onSnapshot((querySnapshot) => {
                if(isMounted){
                    setIndividualEvent(querySnapshot.data())
                }
            });
        }

        async function fetchMembersDoc() {

            await fire.firestore()
            .collection("groupsCategory")
            .doc(groupID)
            .collection('events')
            .doc(eventID)
            .collection('memberPicks')
            .onSnapshot((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if(isMounted){
                        if(!membersPicked.includes(doc.id)){
                            setMembersPicked( arr => [...arr, doc.id])
                            // console.log('get the member pickss doc ref heree   '  + doc)

                        }
                    }
                    // console.log('get the member pickss doc ref heree   '  + doc.id)
                })
                // if(isMounted){
                //     setIndividualEvent(querySnapshot.data())
                //     // setGroupList(querySnapshot.docs.map(doc => doc.data()))
                // }
            });
        }

        fetchData();
        fetchMembersDoc()

        return () => {
            isMounted = false
        }

    }, []);

    console.log("events listt deets here " + individualEvent.eventName)
    console.log('get the member pickss doc ref heree listttt  '  + membersPicked)
    console.log('print event admin hereee gooo kekekek   ' + individualEvent.eventAdmin)


    return (
        <Container className={classes.page}>
            <IndividualEventCard event={individualEvent} membersPicked={membersPicked} groupID={groupID} currentUserUID={currentUserUID}/>
        </Container>
    );
}
 
export default IndividualEvent;
