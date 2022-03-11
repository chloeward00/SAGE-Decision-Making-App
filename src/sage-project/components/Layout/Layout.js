import ResponsiveDrawer from "../Dashboard/Drawer/SideDrawer";
import { makeStyles } from '@mui/styles';
import { AppBar, Avatar, Toolbar, Typography } from "@mui/material";
import 'firebase/auth';
import fire from 'firebase/app'


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
        marginRight: theme.spacing(2)
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        // height: '10%'
        backgroundColor: '#556cd6'
    },
    toolbar: theme.mixins.toolbar,
    welcomeSign: {
        flexGrow: 1
    }
}))

const Layout = ({ children }) => {

    const classes = useStyles();
    
    const currentUserName = fire.auth().currentUser.displayName;

    return (
        <div className={classes.root}>
            <AppBar
                className={classes.appBar}
                elevation={0}
                color="inherit"
            >
                <Toolbar>
                    <Typography className={classes.welcomeSign}>
                        {"Welcome back, " + currentUserName + "!"}
                    </Typography>
                    <Avatar className={classes.avatar}>{currentUserName.charAt(0)}</Avatar>
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