
import { Grid, Container, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import GroupsCard from './GroupsCard';
import { useEffect, useState } from 'react';
import 'firebase/firestore';
import fire from 'firebase/app'

const useStyles = makeStyles((theme) => ({
    page: {
        padding: '50px',
        marginTop: theme.spacing(-6)
    }
}))

const Groups = () => {

    const classes = useStyles();

    const [groupsList, setGroupList] = useState([]);
    
    // isMounted is added to prevent memory leaks
    useEffect(() => {

        let isMounted = true;

        async function fetchData() {

            await fire.firestore().collection('groups').where("groupMembers", "array-contains", fire.auth().currentUser.uid)
            .orderBy('createdAt', 'desc')
            .onSnapshot(snapshot => {
                if(isMounted){
                    setGroupList(snapshot.docs.map(doc => doc.data()))
                }
            })
        }

        fetchData();

        return () => {
            isMounted = false
        }
    },[]);

    return (
        <Container className={classes.page}>
        {
            groupsList.length != 0 ?
            <Grid container spacing={3}>
                {groupsList.map(group => (
                    <Grid key={group.id} item xs={12} md={6} lg={4}>
                        <GroupsCard groups={group}/>
                    </Grid>
                ))}
            </Grid>
            :
            // NEEDS STYLING!!!!
            <Typography textAlign="center"> NOT A MEMBER OF ANY GROUP. CREATE OR JOIN A GROUP NOW. </Typography>
        }
        </Container>
    );
}

export default Groups;
