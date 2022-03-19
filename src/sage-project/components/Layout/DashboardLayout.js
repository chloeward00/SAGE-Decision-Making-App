import ResponsiveDrawer from "../Dashboard/Drawer/SideDrawer";
import { makeStyles } from '@mui/styles';
import { AppBar, Avatar, Toolbar, Typography, Button, ButtonBase, Grid } from "@mui/material";
import 'firebase/auth';
import fire from 'firebase/app'
import { useRouter } from 'next/router'
import SideProfile from "../Dashboard/SideProfile/SideBarProfile";
import Banner from "../Dashboard/Banner/Banner";
import FinalDrawer from "../Dashboard/Drawer/FinalDrawer"

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        backgroundColor: '#F9FAFA',
        minHeight: '100vh'
        // inheight: '100vh'
    },
    feed: {
        // backgroundColor: '#F9FAFA',
        width: '100%',
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

const DashboardLayout = ({ children }) => {
    
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container>

                {/* RESPONSIVE DRAWER */}
                <Grid item sm={2} className={classes.leftBar}>
                    {/* <ResponsiveDrawer/> */}
                    <FinalDrawer/>
                </Grid>

                {/* FEED */}
            <Grid item sm={8} className={classes.feed}>
                    <Banner/>
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
    
export default DashboardLayout;