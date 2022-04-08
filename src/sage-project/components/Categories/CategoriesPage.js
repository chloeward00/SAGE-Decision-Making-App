
import { Container, Typography, Grid} from '@mui/material';
import { makeStyles } from '@mui/styles';
import ActivityCard from './ActivityCard';
import MovieCard from './MoviesCard';
import RestaurantCard from './RestaurantsCard';


const useStyles = makeStyles((theme) => ({
    featureContainer: {
        paddingTop: theme.spacing(4),
    }
}))

const CategoriesCards = ({ groupID }) => {

    const classes = useStyles();
    
    return (  
        <Container className={classes.featureContainer}>
            <Grid container spacing={6}>
                {/* Movies */}
                <Grid item xs={12} sm={6} md={4}>
                    <ActivityCard groupID={groupID}/>
                </Grid>
                {/* Activities */}
                <Grid item xs={12} sm={6} md={4}>
                    <RestaurantCard groupID={groupID}/>
                </Grid>
                {/* Restaurants */}
                <Grid item xs={12} sm={6} md={4}>
                    <MovieCard groupID={groupID}/>
                </Grid>
            </Grid>
        </Container>
    );
}
 
export default CategoriesCards;