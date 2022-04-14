import { Typography, Grid, Container, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import GroupsIcon from '@mui/icons-material/Groups';
import fire from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore';
import { useState, useEffect } from 'react';
import EditEventDialog from './EditEventDialog';
import EventIcon from '@mui/icons-material/Event';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import IconButton from '@mui/material/IconButton';
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

const EventsBanner = ({ eventID, eventName, groupID, eventDetails }) => {
    
    const classes = useStyles();
    const router = useRouter();

    const userID = fire.auth().currentUser.uid;

    const [groupCreator, setGroupCreator] = useState("");

    useEffect(() => {
        async function fetchData() {
            
            //  calling firebase like this does not lag when updated
            await fire.firestore().collection('groups').where("groupID", "==", groupID)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    console.log("printing admin deeeets here  " + doc.data().groupAdmin);
                    setGroupCreator(doc.data().groupAdmin)
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });

        }

        fetchData()
    });

    return (
        <div>
            <Container className={classes.page}>
                <Grid container direction="row" alignItems="center">
                    <div className={classes.backArrow}>
                        <IconButton size="medium" onClick={ () => { router.push(`/groups/${groupID}`)}}>
                        <ArrowBackIosNewIcon fontSize="inherit"/>
                        </IconButton>
                    </div>
                    <EventIcon fontSize="large" className={classes.groupTitle}/>
                    <Typography variant="h5" className={classes.groupLine}>
                        {eventName}
                    </Typography>
                    {/* only show thr edit event to group admin */}
                    {userID == groupCreator ? <EditEventDialog groupID={groupID} eventID={eventID} eventDetails={eventDetails} /> : null}
                </Grid>
            </Container>
        </div>
    );
}

export default EventsBanner;