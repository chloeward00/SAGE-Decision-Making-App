
import { Grid, Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import GroupsCard from './GroupsCard';
import { useEffect, useState } from 'react';
import { groupsCollection } from '../../../firebase/collections';
import 'firebase/firestore';

const useStyles = makeStyles((theme) => ({
    page: {
        padding: '50px',
        marginTop: theme.spacing(-6)
    }
}))

const Groups = () => {

    const classes = useStyles();

    const [groupsList, setGroupList] = useState([]);
    
    // display the groups according to their timestamp - using orderBy
    useEffect(() => {
        groupsCollection.orderBy('createdAt', 'desc').onSnapshot(snapshot => (
            setGroupList(snapshot.docs.map(doc => doc.data()))
        ))
    }, [])

    return (
        <Container className={classes.page}>
            <Grid container spacing={3}>
                {groupsList.map(group => (
                    <Grid key={group.id} item xs={12} md={6} lg={4}>
                        <GroupsCard groups={group}/>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default Groups;