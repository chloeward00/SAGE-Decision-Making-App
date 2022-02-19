
import { Typography, Grid, Button, Divider, Container, Box, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import GroupsCard from './GroupsCard';

const useStyles = makeStyles((theme) => ({
    page: {
        padding: '50px',
        marginTop: theme.spacing(-6)
    }
}))

const Groups = () => {

    const classes = useStyles();

    // this will eventually be changed by the data pulled from firebase
    const groupsList = [
        {
            groupName: "Big Brains",
            groupDescription: "we are just the best brains simply",
            numberOfPlans: 4,
        },
        {
            groupName: "Big Brains",
            groupDescription: "we are just the best brains simply",
            numberOfPlans: 4,
        },
        {
            groupName: "Big Brains",
            groupDescription: "we are just the best brains simply",
            numberOfPlans: 4,
        },
        {
            groupName: "Big Brains",
            groupDescription: "we are just the best brains simply",
            numberOfPlans: 4,
        },
        {
            groupName: "Big Brains",
            groupDescription: "we are just the best brains simply",
            numberOfPlans: 4,
        },
        {
            groupName: "Big Brains",
            groupDescription: "we are just the best brains simply",
            numberOfPlans: 4,
        },
    ]

    return (
        <Container className={classes.page}>
            <Grid container spacing={3}>
                {groupsList.map( group => (
                    <Grid key={group.groupName} item xs={12} md={6} lg={4}>
                        <GroupsCard groups={group}/>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default Groups;