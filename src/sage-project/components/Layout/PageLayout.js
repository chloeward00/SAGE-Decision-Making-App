import ResponsiveDrawer from "../Dashboard/Drawer/SideDrawer";
import { makeStyles, useTheme } from '@mui/styles';
import { AppBar, Avatar, Toolbar, Typography, Button, ButtonBase, Grid } from "@mui/material";
import 'firebase/auth';
import fire from 'firebase/app'
import { useRouter } from 'next/router'
import SideProfile from "../Dashboard/SideProfile/SideBarProfile";
import Banner from "../Dashboard/Banner/Banner";
import FinalDrawer from "../Dashboard/Drawer/FinalDrawer"
import Leftbar from "../Dashboard/Drawer/Drawer";


// const drawerWidth = theme.spacing(20)
const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        backgroundColor: '#F9FAFA',
        minHeight: '100vh'
    },
    feed: {
        // backgroundColor: '#F9FAFA',
        width: '100%',
        // padding: theme.spacing(3)
    },
    rightBar: {
        backgroundColor: 'white',
        [theme.breakpoints.down('lg')]: {
            display: 'none'
        }
    },
    leftBar: {
        backgroundColor: 'white'
    }
}))

const PageLayout = ({ children }) => {
    
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container>

                {/* RESPONSIVE DRAWER */}
                <Grid item sm={2} className={classes.leftBar}>
                    {/* <ResponsiveDrawer/> */}
                    <FinalDrawer/>
                    {/* <Leftbar/> */}
                </Grid>

                {/* FEED */}
                <Grid item sm={8} className={classes.feed}>
                        {/* <Banner/> */}
                        {children}
                </Grid>
                
                {/* SIDE BAR PROFILE */}
                <Grid item sm={2} className={classes.rightBar}>
                    <SideProfile/>
                </Grid>
            </Grid>
        </div>
    );
}

export default PageLayout;