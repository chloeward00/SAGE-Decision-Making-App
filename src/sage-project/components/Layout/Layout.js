import ResponsiveDrawer from "../Dashboard/Drawer/SideDrawer";
import { makeStyles } from '@mui/styles';
import { AppBar, Avatar, Toolbar, Typography } from "@mui/material";

const drawerWidth = 240;
const name = "Solana"

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    page: {
        backgroundColor: '#F9F9F9',
        width: '100%'
    },
    avatar: {
        marginRight: theme.spacing(2)
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        // backgroundColor: '#FFF'
    },
    toolbar: theme.mixins.toolbar,
    welcomeSign: {
        flexGrow: 1
    }
}))

const Layout = ({ children }) => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar
                className={classes.appBar}
                elevation={0}
                color="inherit"
            >
                <Toolbar>
                    <Typography className={classes.welcomeSign}>
                        Welcome back, Solana!
                    </Typography>
                    <Avatar className={classes.avatar}>{name.charAt(0)}</Avatar>
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