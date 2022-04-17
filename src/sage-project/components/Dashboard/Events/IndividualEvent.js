
import { Grid, Container, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import IndividualEventCard from './IndividualEventCard';
import { useState, useEffect } from 'react';
import fire from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth'
import MatchedAPDialog from './MatchedActivityPlace';

const useStyles = makeStyles((theme) => ({
    page: {
        padding: '50px',
        display: "flex", 
        alignItems: "center",
        justifyContent: "center"
    }
}))

const IndividualEvent = ({ groupID, eventID, eventDetails, eventName }) => {

    const classes = useStyles();

    const [individualEvent, setIndividualEvent] = useState([]);
    const [membersPicked, setMembersPicked] = useState([])
    const [groupMembers, setGroupMembersList] = useState([])
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
                        // if current user not in the membersPicked list, then add it there -- meaning they already did the survey
                        if(!membersPicked.includes(doc.id)){
                            setMembersPicked( arr => [...arr, doc.id])
                        }
                    }
                })
            });
        }

        async function fetchGroup() {

            await fire.firestore()
            .collection("groups")
            .doc(groupID)
            .onSnapshot((querySnapshot) => {
                if(isMounted){
                    for (const group of querySnapshot.data().groupMembers){
                        setGroupMembersList( arr => [...arr, group])
                    }
                    // setGroupMembersList([querySnapshot.data().groupMembers])
                }
            });
        }

        fetchData();
        fetchMembersDoc()
        fetchGroup()

        return () => {
            isMounted = false
        }

    }, []);

    return (
        <Container className={classes.page}>
            <IndividualEventCard event={individualEvent} membersPicked={membersPicked} groupID={groupID} currentUserUID={currentUserUID} groupMembersList={groupMembers}/>
        </Container>
    );
}
 
export default IndividualEvent;
