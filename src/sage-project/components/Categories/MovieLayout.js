
import ResponsiveDrawer from "../Dashboard/Drawer/SideDrawer";
import { makeStyles, useTheme } from '@mui/styles';
import { AppBar, Avatar, Toolbar, Typography, Button, ButtonBase, Grid, Paper, Chip, Container, ListItem } from "@mui/material";
import MovieDialog from "./MovieDialog";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#A9B5DD', 
        minHeight: "100vh"
    },
    paper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(12),
    },
    button: {
        padding: theme.spacing(2),
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(4)
    },
}))


const MovieLayout = () => {
    
    const classes = useStyles();

    const moviesCategories = [
        {
            name: "Popular",
            alias: "popular"
        },
        // {
        //     name: "Latest",
        //     alias: "latest"
        // },
        {
            name: "Top Rated",
            alias: "top_rated"
        },
    ]

    return (
        <div className={classes.root}>
            <Paper elevation={10} className={classes.paper}>
                {moviesCategories.map((data) => {
                    return (
                        <div className={classes.button}>
                            <MovieDialog name={data.name} alias={data.alias}/>
                        </div>
                    )
                })}
            </Paper>
        </div>
    );
}
    
export default MovieLayout;