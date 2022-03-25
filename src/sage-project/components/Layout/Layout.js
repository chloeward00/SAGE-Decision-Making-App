import ResponsiveDrawer from "../Dashboard/Drawer/SideDrawer";
import { makeStyles } from '@mui/styles';
import { AppBar, Avatar, Toolbar, Typography, Button, ButtonBase } from "@mui/material";
import 'firebase/auth';
import fire from 'firebase/app'
import { useRouter } from 'next/router'


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    page: {
        backgroundColor: '#F9FAFA',
        width: '100%',
    },
    avatar: {
        marginRight: theme.spacing(2),
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        // height: '10%'
        backgroundColor: '#556cd6'  // leave this colour for testing purposes
    },
    toolbar: theme.mixins.toolbar,
    welcomeSign: {
        flexGrow: 1
    }
}))

const Layout = ({ children }) => {

    const classes = useStyles();

    const router = useRouter();
    
    const currentUserName = fire.auth().currentUser.displayName;

    const getUserFirstLetterName = currentUserName.charAt(0).toLocaleUpperCase()

    return (
        <div className={classes.root}>
        {/* CHANGE THIS APP BAR - NO APP BAR JUST A CONTAINER THAT SAYS WELCOME BACK TO THE USER AND THE CALENDAR */}
            <AppBar
                className={classes.appBar}
                elevation={0}
                color="inherit"
            >
                <Toolbar>
                    <Typography className={classes.welcomeSign}>
                        {"Welcome back, " + currentUserName + "!"}
                    </Typography>
                    <Avatar component={ButtonBase} className={classes.avatar} onClick={() => {router.push('/profile')}} >{getUserFirstLetterName}</Avatar>
                </Toolbar>
            </AppBar>
            <ResponsiveDrawer/>
            <div className={classes.page}>
                <div className={classes.toolbar}></div>
                {children}
            </div>
        </div>
    );
}
    
export default Layout;