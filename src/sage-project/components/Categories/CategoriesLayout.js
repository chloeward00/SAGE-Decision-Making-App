
import ResponsiveDrawer from "../Dashboard/Drawer/SideDrawer";
import { makeStyles, useTheme } from '@mui/styles';
import { AppBar, Avatar, Toolbar, Typography, Button, ButtonBase, Grid, Paper, Chip, Container, ListItem } from "@mui/material";
import 'firebase/auth';
import fire from 'firebase/app'
import { useRouter } from 'next/router'
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

// console.log(ActiveCats)

const CategoriesLayout = ({ children }) => {
    
    const classes = useStyles();

    const activitiesCategories = [
        {
            name: "active"
        },
        {
            name: "chill"
        }
    ]

    const activeCategories = [
        {
            // this needs to open more options
            name: "active",
            onClick: () => router.push('/home/calendar')
        }, 
        
        {
            name: "festivals"
        }, 
        
        {
            name: "fitness"
        }, 
        
        {
            name: "nightlife"
        }, 
        
        {
            // this needs to open more options
            name: "sports",
            path: ""
        }, 
        
        {
            name: "zoos"
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
                {/* <Chip variant="outline" label="sample chipp"/>
                <Chip variant="outline" label="sample chipp"/>
                <Chip variant="outline" label="sample chipp"/>
                <Chip variant="outline" label="sample chipp"/> */}
            </Paper>
        </div>
    );
}
    
export default CategoriesLayout;