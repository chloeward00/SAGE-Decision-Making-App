import { Typography, Grid, Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import GroupsIcon from '@mui/icons-material/Groups';
import ResponsiveDialog from './GroupsDialog';

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

const GroupsBanner = ({ groupName, buttonTitle }) => {
    
    const classes = useStyles();

    return (
        <div>
            <Container className={classes.page}>
                <Grid container direction="row" alignItems="center">
                    <GroupsIcon fontSize="large" className={classes.groupTitle}/>
                    <Typography variant="h5" className={classes.groupLine}>
                        {groupName}
                    </Typography>
                    <ResponsiveDialog buttonTitle={buttonTitle}/>
                </Grid>
            </Container>
        </div>
    );
}

export default GroupsBanner;