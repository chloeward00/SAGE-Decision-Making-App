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

    useEffect(() => {

        let isMounted = true;

        async function fetchData() {

            await fire.firestore().collection('groups').where("groupMembers", "array-contains", userID)
            .orderBy('createdAt', 'desc')
            .onSnapshot(snapshot => {
                if(isMounted){
                    setGroupList(snapshot.docs.map(doc => doc.data()))
                    // setGroupList(snapshot.docs.map(doc => console.log(doc.data())))
                }
            })
        }

        fetchData();

        return () => {
            isMounted = false
        }
    }, []);
    
    console.log("all groupss hereee " + groupsList)

    return (  
        <h1>
            NOTIFS PAGE HERE
        </h1>
    );
}
 
export default NotificationList;