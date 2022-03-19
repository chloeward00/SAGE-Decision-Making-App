
import { AppBar, Avatar, Toolbar, Typography, Button, ButtonBase, Container, Box, Divider } from "@mui/material";
import { useState, useEffect } from "react";
import GroupsIcon from '@mui/icons-material/Groups';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { makeStyles } from '@mui/styles';
import { useRouter } from 'next/router'
import fire from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore';

// azur lane
const gradient10 = 'rgba(127,127,213,0.5)' //#7F7FD5
const gradient11 = 'rgba(134,168,231,1)' // #86A8E7

const useStyles = makeStyles((theme) => ({
    root: {
        // display: 'flex',
    },
    profileBG: {
        backgroundImage: `linear-gradient(${gradient11}, ${gradient10})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        borderRadius: 10,
        height: theme.spacing(16),
        display: 'flex',
        justifyContent: 'center',
        marginTop: theme.spacing(4)
        // position: 'relative',
    },
    avatar: {
        width: 60,
        height: 60,
        fontSize: 32,
        // change these colours
        // color: 'black',
        backgroundColor: theme.colours.pink,
        marginTop: -65,
        margin: 'auto'
    },
    avatarWhite: {
        width: 70,
        height: 70,
        borderRadius: 100 / 2,
        backgroundColor: 'white',
        margin: 'auto',
        marginTop: -30,
    },
    profileText: {
        paddingTop: theme.spacing(3)
    },
    userStats: {
        display: 'flex',
        justifyContent: 'space-evenly',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column'
        }
    },
    userName: {
        paddingLeft: 5,
        fontWeight: 500,
        // ADD COLOUR HERE
    },
    userNameContainer: {
        padding: theme.spacing(3)
    },
    groupStats: {
        borderRadius: 10,
        backgroundColor: theme.colours.blue,
        width: theme.spacing(6),
        height: theme.spacing(6)
    },
    eventStats: {
        borderRadius: 10,
        backgroundColor: theme.colours.rose,
        width: theme.spacing(6),
        height: theme.spacing(6)
    },
    stats: {
        flexDirection: 'column',
        // marginLeft: theme.spacing(-1)
    },
    userBio: {
        // margin: theme.spacing(2)
        // marginTop: theme.spacing(2),
        marginBottom: theme.spacing(6)
    },
    userBioText: {
        color: theme.text.gray
    }
}))

const SideProfile = () => {

    const userID = fire.auth().currentUser.uid;
    const [numGroups, setNumGroups] = useState('');
    const [numEvents, setNumEvents] = useState('');

    useEffect(() => {
        async function getNumberGroups() {

            var docRef = await fire.firestore().collection('users').doc(userID)
            
            docRef.get().then((doc) => {
                if (doc.exists) {
                    // console.log("Document data:", doc.data().userGroups.length);
                    setNumGroups(doc.data().userGroups.length)
                } else {
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });

        }

        async function getNumberEvents() {

            var docRef = await fire.firestore().collection('users').doc(userID)
            
            docRef.get().then((doc) => {
                if (doc.exists) {
                    // console.log("Document data:", doc.data().userEvents.length);
                    setNumEvents(doc.data().userEvents.length)
                } else {
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });

        }

        getNumberGroups();
        getNumberEvents();
    });

    const classes = useStyles();

    const router = useRouter();

    const currentUserName = fire.auth().currentUser.displayName;

    const getUserFirstLetterName = currentUserName.charAt(0).toLocaleUpperCase()

    return (
        <Container>
            <div className={classes.profileText}>
                <Typography variant="h5">
                    {"Profile"}
                </Typography>
            </div>
            
            {/* GRADIENT BACKGROUND */}
            <div className={classes.profileBG}>
            </div>

            {/* BACKGROUND WHITE FOR THE AVATAR */}
            <div className={classes.avatarWhite}>
            </div>

            {/* THIS IS FOR THE USER AVATAR */}
            <div>
                <Avatar className={classes.avatar}>{getUserFirstLetterName}</Avatar>
            </div>

            {/* USER NAME */}
            <div className={classes.userNameContainer}>
                <Typography variant="h5" align="center" className={classes.userName}>
                    {currentUserName}
                </Typography>
            </div>

            {/* INSERT USER BIO HERE */}
            <div className={classes.userBio}>
                <Typography align="center" className={classes.userBioText}>
                    {"Software Engineer at Google || '98 || Dublin, Ireland"}
                </Typography>
            </div>

            {/* USER STATS - NUMBER OF GROUPS, NUMBER OF EVENTS - FIREBASE DATA WORKS!!! */}
            <div className={classes.userStats}>
                
                {/* groups */}
                <ButtonBase onClick={ () => { router.push('/groups')}}>
                    <Avatar className={classes.groupStats}>
                        <GroupsIcon/>
                    </Avatar>
                </ButtonBase>

                <div className={classes.stats}>
                    <Typography fontWeight="800">
                        {numGroups}
                    </Typography>
                    <Typography color="gray">
                        {"Groups"}
                    </Typography>
                </div>

                {/* events */}
                <ButtonBase onClick={ () => { router.push('/home')}}>
                    <Avatar className={classes.eventStats}>
                        <EventNoteIcon/>
                    </Avatar>
                </ButtonBase>

                <div className={classes.stats}>
                    <Typography fontWeight="800">
                        {numEvents}
                    </Typography>
                    <Typography color="gray">
                        {"Events"}
                    </Typography>
                </div>
            </div>
        </Container>
    );
}

export default SideProfile;