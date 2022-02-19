import { Typography, Grid, Button, Divider, Container, Box, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import GroupsIcon from '@mui/icons-material/Groups';
import AddCircleIcon from '@mui/icons-material/AddCircle';

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

const GroupsBanner = () => {
    
    const classes = useStyles();

    return (  
        <div>
            <Container className={classes.page}>
                <Grid container direction="row" alignItems="center">
                    <GroupsIcon fontSize="large" className={classes.groupTitle}/>
                    <Typography variant="h5" className={classes.groupLine}>
                        {"Groups"}
                    </Typography>
                    <Button variant="contained" startIcon={<AddCircleIcon />}>
                        {"Create a group"}
                    </Button>
                </Grid>
            </Container>
        </div>
    );
}
 
export default GroupsBanner;