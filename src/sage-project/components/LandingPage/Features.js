
import { Container, Typography, Grid} from '@mui/material';
import { makeStyles } from '@mui/styles';
import ActivityComponent from './ActivityComponent';
import MovieComponent from './MovieComponent';
import RestaurantComponent from './RestaurantComponent';


const useStyles = makeStyles((theme) => ({
    featureContainer: {
        paddingTop: theme.spacing(10),
        paddingBottom: theme.spacing(12),
    },
    featureTitle: {
        fontWeight: 800,
        paddingBottom: theme.spacing(6),
        color: '#AC7698' // #CD7386
    }
}))

const FeatureCard = () => {

    const classes = useStyles();
    return (  
        <Container maxWidth="lg" className={classes.featureContainer}>
            <Typography variant="h4" align="center" className={classes.featureTitle}>
                {"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
            </Typography>
            <Grid container spacing={8}>
                {/* Movies */}
                <Grid item xs={12} sm={6} md={4}>
                    <MovieComponent/>
                </Grid>
                {/* Activities */}
                <Grid item xs={12} sm={6} md={4}>
                    <ActivityComponent/>
                </Grid>
                {/* Restaurants */}
                <Grid item xs={12} sm={6} md={4}>
                    <RestaurantComponent/>
                </Grid>
            </Grid>
        </Container>
    );
}
 
export default FeatureCard;