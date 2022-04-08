import { Typography, Grid, Container, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import GroupsIcon from '@mui/icons-material/Groups';
import CustomizedDialogs from './MembersDialog';
import CreateGroupDialog from './GroupsDialog';
import CreateEventDialog from './CreateEventDialog';

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

    return (
        <div>
            <Container className={classes.page}>
                <Grid container direction="row" alignItems="center">
                    <GroupsIcon fontSize="large" className={classes.groupTitle}/>
                    <Typography variant="h5" className={classes.groupLine}>
                        {groupName}
                    </Typography>
                    {buttonTitle == "Create a new group" ? null : <CreateEventDialog groupID={groupID} />}
                    {buttonTitle == "Create a new group" ? <CreateGroupDialog buttonTitle={buttonTitle}/> : <CustomizedDialogs buttonTitle={buttonTitle} groupName={groupName}/>}
                </Grid>
            </Container>
        </div>
    );
}

export default GroupsBanner;