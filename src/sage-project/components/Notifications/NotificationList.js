import { Typography, Grid, Container, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import GroupsIcon from '@mui/icons-material/Groups';
import fire from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'


const useStyles = makeStyles((theme) => ({
    page: {
        padding: '50px'
    },
    groupTitle: {
        marginRight: theme.spacing(2),
        color: theme.colours.gradient1
    },
    groupLine: {
        flexGrow: 1
    },
    backArrow: {
        marginRight: theme.spacing(8)
    }
}))

const NotificationList = () => {

    const classes = useStyles();
    const router = useRouter();

    const userID = fire.auth().currentUser.uid;

    const [groupsList, setGroupList] = useState([]);
    const [allUserEvents, setAllUserEvents] = useState([])
    const [membersPicked, setMembersPicked] = useState([])

    useEffect(() => {

        let isMounted = true;

        async function fetchData() {

            await fire.firestore().collection('users').doc(userID)
            .onSnapshot(snapshot => {
                if(isMounted){
                    setAllUserEvents( arr => [...arr, snapshot.data().userEvents])
                }
            })
        }

        fetchData();
        
        return () => {
            isMounted = false
        }
    }, []);


    // useEffect(() => {
    //     console.log('USE EFTTOOEOK HEREEE')
    //     for (let groupID of groupsList) {
    //         fire.firestore()
    //         .collection("groupsCategory")
    //         .doc(groupID)
    //         .collection('events')
    //         .onSnapshot((querySnapshot) => {
    //             querySnapshot.forEach((doc) => {
    //                 setAllUserEvents( arr => [...arr, doc.id])
    //             })
    //         });
    //     }
    // }, [groupsList]);


    // useEffect(() => {
    //     console.log('MEMBERPICKS HEREEE')
        
    //     for (const groupID of groupsList) {
    //         for(const eventID of allUserEvents){
    //             fire.firestore()
    //             .collection("groupsCategory")
    //             .doc(groupID)
    //             .collection('events')
    //             .doc(eventID)
    //             .collection('memberPicks')
    //             .onSnapshot((querySnapshot) => {
    //                 querySnapshot.forEach((doc) => {
    //                     // console.log('haaaaaaaaaaaaaaaaaaaaaaaaaa')
    //                     if(!membersPicked.includes(doc.id)){
    //                         setMembersPicked([...membersPicked, doc.id])
    //                     }                    
    //                 })
    //             });
    //         }
    //     }
    // }, [allUserEvents]);


    // fetchMemPick()
    console.log(allUserEvents)
    
    return (  
        <h1>
            NOTIFS PAGE HERE
        </h1>
    );
}
 
export default NotificationList;