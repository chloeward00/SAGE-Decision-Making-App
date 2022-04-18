
import { AppBar, Avatar, Toolbar, Typography, Button, ButtonBase, Container, Box, Divider } from "@mui/material";
import { useState, useEffect } from "react";
import GroupsIcon from '@mui/icons-material/Groups';
import EditIcon from '@mui/icons-material/Edit';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { makeStyles } from '@mui/styles';
import { useRouter } from 'next/router'
import fire from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore';
import SettingsDialog from '../Drawer/SettingsDialog'
import EditProfileDialog from "./EditProfileDialog";

// azur lane
const gradient10 = 'rgba(127,127,213,0.5)' //#7F7FD5
const gradient11 = 'rgba(134,168,231,1)' // #86A8E7

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'sticky',
        top: 0,
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
    },
    avatar: {
        width: 60,
        height: 60,
        fontSize: 32,
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
    },
    userNameContainer: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1)    
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
    userEmail: {
        // margin: theme.spacing(2)
        // marginTop: theme.spacing(2),
        marginBottom: theme.spacing(4)
    },
    userBioText: {
        color: theme.text.gray
    },
    editIcon: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: theme.spacing(2),
    }
}))

const SideProfile = () => {

    const userID = fire.auth().currentUser.uid;
    const userEmail = fire.auth().currentUser.email;

    const [numGroups, setNumGroups] = useState('');
    const [numEvents, setNumEvents] = useState('');
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');

    useEffect(() => {
        async function fetchData() {

            //  calling firebase like this does not lag when updated
            await fire.firestore().collection('users').doc(userID)
            .get()
            .then((querySnapshot) => {
                setName(querySnapshot.data().userName)
                setBio(querySnapshot.data().userBio)
                // console.log("hereeee " + querySnapshot.data().userBio)
            })  
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
        }
        fetchData()
    });

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

    const getUserFirstLetterName = name.charAt(0).toLocaleUpperCase()

    return (
        <Container className={classes.root}>
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

            {/* EDIT PROFILE BUTTON HERE */}
            <div className={classes.editIcon}>
                <EditProfileDialog userName={name} userBio={bio}/>
            </div>

            {/* USER NAME */}
            <div className={classes.userNameContainer}>
                <Typography variant="h5" align="center" className={classes.userName}>
                    {name}
                </Typography>
            </div>

            {/* INSERT email HERE */}
            <div className={classes.userEmail}>
                <Typography align="center" className={classes.userBioText}>
                {userEmail}
                </Typography>
            </div>

            {/* INSERT USER BIO HERE */}
            <div className={classes.userBio}>
                <Typography align="center" className={classes.userBioText}>
                {bio}
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