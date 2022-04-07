import { Typography, Grid, Container, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import GroupsIcon from '@mui/icons-material/Groups';
import CustomizedDialogs from './MembersDialog';
import CreateGroupDialog from './GroupsDialog';
import CreateEventDialog from './CreateEventDialog';
import fire from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore';
import { useState, useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
    page: {
        padding: '50px'
    },
    groupTitle: {
        marginRight: theme.spacing(2)
    },
    groupLine: {
        flexGrow: 1
    }
}))

const GroupsBanner = ({ groupName, buttonTitle, groupID }) => {
    
    const classes = useStyles();

    const userID = fire.auth().currentUser.uid;

    const[groupCreator, setGroupCreator] = useState("");

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

    const adminPrivilege = buttonTitle != "Create a new group" && userID == groupCreator;

    return (
        <div>
            <Container className={classes.page}>
                <Grid container direction="row" alignItems="center">
                    <GroupsIcon fontSize="large" className={classes.groupTitle}/>
                    <Typography variant="h5" className={classes.groupLine}>
                        {groupName}
                    </Typography>
                    {adminPrivilege == true ? <CreateEventDialog groupID={groupID}/> : null}
                    {/* {buttonTitle == "Create a new group" ? null : <CreateEventDialog groupID={groupID} />} */}
                    {buttonTitle == "Create a new group" ? <CreateGroupDialog buttonTitle={buttonTitle}/> : <CustomizedDialogs buttonTitle={buttonTitle} groupName={groupName}/>}
                </Grid>
            </Container>
        </div>
    );
}

export default GroupsBanner;