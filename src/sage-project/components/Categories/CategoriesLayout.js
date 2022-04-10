
import ResponsiveDrawer from "../Dashboard/Drawer/SideDrawer";
import { makeStyles, useTheme } from '@mui/styles';
import { AppBar, Avatar, Toolbar, Typography, Button, ButtonBase, Grid, Paper, Chip, Container, ListItem } from "@mui/material";
import ActiveDialog from "./ActivityDialog";


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
        padding: '50px 50px',
        width: 600,
        // margin: theme.spacing(2)
    },
    button: {
        padding: theme.spacing(2),
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(4)
    },
}))


const CategoriesLayout = () => {
    
    const classes = useStyles();

    const activitiesCategories = [
        {
            name: "active"
        },
        {
            name: "chill"
        }
    ]

    return (
        <div className={classes.root}>
            <Paper elevation={10} className={classes.paper}>
                {activitiesCategories.map((data) => {
                    return (
                        <div className={classes.button}>
                            <ActiveDialog name={data.name}/>
                        </div>
                    )
                })}
            </Paper>
        </div>
    );
}
    
export default CategoriesLayout;