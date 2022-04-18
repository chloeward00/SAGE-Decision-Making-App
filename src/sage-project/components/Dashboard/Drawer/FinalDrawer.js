import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DashboardIcon from '@mui/icons-material/Dashboard';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import GroupsIcon from '@mui/icons-material/Groups';
import LogoutIcon from '@mui/icons-material/Logout';
import ButtonBase from '@mui/material/ButtonBase';
import SettingsIcon from '@mui/icons-material/Settings';
import Avatar from '@mui/material/Avatar';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { useRouter } from 'next/router'
import { makeStyles, useTheme } from '@mui/styles';
import Image from 'next/image'
import sageLogo from '../../../assets/sage_1_cropped.png'
import finalSageLogo from '../../../assets/sage2_logo.png'
import highres from '../../../assets/highres_sage_logo.png'
import { Container } from "@mui/material";


import 'firebase/auth';
import fire from 'firebase/app'
import firebase from "../../../firebase/firebase";
import SettingsDialog from "./SettingsDialog"

const drawerWidth = 240;


const useStyles = makeStyles((theme) => ({
    activeRoute: {
        backgroundColor: '#EFD3D7',
        borderRadius: '20px',
    },
    activeText: {
        color: '#000000',
        // marginLeft: '0px',
    },
    activeIcon: {
        marginLeft: '30px',
        color: '#000000',
    },
    activeAvatar: {
        '& .MuiAvatar-root': {
            borderRadius: 15,
            backgroundColor: '#EFD3D7',
            marginLeft: '-15px'
        }
    },
    avatar: {
        '& .MuiAvatar-root': {
            borderRadius: 15,
            backgroundColor: 'white',
            marginLeft: '-15px'
        }
    },
    icons: {
        marginLeft: '30px',
        color: '#8E8E8E',
    },
    text: {
        color: '#8E8E8E',
        fontWeight: 800,
        marginLeft: '-10px',
    },
    listContainer: {
        margin: '20px',
        // flexGrow: 1
    },
    logo: {
        // backgroundColor: '#EFD3D7',
        padding: '20px'
    },
    sampleIcon: {
        backgroundColor: 'yellow',
        borderRadius: '20px'
    },
    sampleText: {
        backgroundColor: theme.colours.rose,
        padding: '4px',
        borderRadius: 10,
        marginLeft: '-60px',
        paddingRight: 50,
        paddingLeft: 50
    },
    dashboardText: {
        backgroundColor: 'pink',
        padding: '4px',
        borderRadius: 15,
        marginLeft: '-60px',
        paddingRight: 55,
        paddingLeft: 50
    },
    notifsText: {
        backgroundColor: 'pink',
        padding: '4px',
        borderRadius: 15,
        marginLeft: '-60px',
        paddingRight: 40,
        paddingLeft: 50
    },
    calendarText: {
        backgroundColor: 'pink',
        padding: '4px',
        borderRadius: 15,
        marginLeft: '-60px',
        paddingRight: 70,
        paddingLeft: 50
    },
    groupsText: {
        backgroundColor: 'pink',
        padding: '4px',
        borderRadius: 15,
        marginLeft: '-60px',
        paddingRight: 80,
        paddingLeft: 50
    },
    logOutButton: {
        // alignItems: 'flex-end',
        // alignContent: 'flex-end'
    },
    root: {
        display: 'flex',
        alignItems: 'flex-end',
    },
}))


function ResponsiveDrawer(props) {
    
    const router = useRouter();
    const classes = useStyles();

    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const itemsList = [
        {
            text: "Dashboard",
            icon: <DashboardIcon/>,
            path: '/home',
            onClick: () => router.push('/home')
        },
        {
            text: "Calendar",
            icon: <CalendarTodayIcon/>,
            path: '/home/calendar',
            onClick: () => router.push('/home/calendar')
        },
        {
            text: "Groups",
            icon: <GroupsIcon/>,
            path: router.pathname == '/groups' ? '/groups' : router.pathname == '/groups/[group]' ? '/groups/[group]' : '/groups/[group]/event/[event]',
            onClick: () => router.push('/groups')
        },
        {
            text: "Log out",
            icon: <LogoutIcon/>,
            onClick: async () => {
                await firebase.logout()
                router.push('/login')}
        }
    ]

    const drawer = (
        <Container>
        {/* THIS TOOLBAR HERE WILL BE ADDED WITH THE SAGE LOGO OR JUST SAGE TEXT */}
        <Toolbar className={classes.logo}>
            {/* <Typography align="center" variant="h3">
                {"SAGE"}
            </Typography> */}
            <div className={classes.logoDiv}>
                <Image 
                    src={finalSageLogo}
                    alt="sage logo"
                    // layout="fill"
                    width='600'
                    height='200'
                />
            </div>

        </Toolbar>
        <List className={classes.listContainer}>
            {itemsList.map((item, index) => {
            const { text, icon, path, onClick } = item;
            return (
                <ListItem
                component={ButtonBase}
                key={text} 
                onClick={onClick}
                >
                    <ListItemAvatar className={router.pathname == path? classes.activeAvatar : classes.avatar}>
                        <Avatar>
                        {icon && <ListItemIcon className={router.pathname == path ? classes.activeIcon : classes.icons}>{icon}</ListItemIcon>}
                        </Avatar>
                    </ListItemAvatar>
                    {/* THIS NEEDS TO BE FIXED - MAKE THE PADDING RIGHT IN A FIX VALUE FOR EACH ONE */}
                    <div className={
                        router.pathname == path ? classes.sampleText : null}>
                        <ListItemText primary={text} className={router.pathname == path ? classes.activeText : classes.text}/>
                    </div>
                </ListItem>
            )})}
        </List>
        {/* <div  className={classes.root}> */}
        {/* <List className={classes.root}>
            {logOut.map((item, index) => {
            const { text, icon, onClick } = item;
            return (
                <ListItem
                component={ButtonBase}
                key={text} 
                onClick={onClick}
                >
                    {icon && <ListItemIcon>{icon}</ListItemIcon>}
                    <ListItemText primary={text}/>
                </ListItem>
            )})}
        </List>
        </div> */}
        </Container>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div>
            {/* <CssBaseline /> */}
            <AppBar
            position="fixed"
            sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
                display: { xs: 'block', sm: 'none' }
            }}
            >
            <Toolbar>
                <IconButton
                color="error"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                    {"SAGE"}
                </Typography>
            </Toolbar>
            </AppBar>
            {/* <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, boxShadow: 'none' }}
            aria-label="mailbox folders"
            > */}
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                {/* THIS DRAWER IS FOR SMALLER SCREENS */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth},
                    }}
                >
                    {drawer}
                </Drawer>
                {/* THIS DRAWER IS FOR LARGER SCREENS / DRAWER WILL BE PERMANENT*/}
                {/* backgroundColor: '#CBD5F0' -- ADD THE COLOUR OF THE BG IN THE DISPLAY COMPONENT*/}
                <Drawer
                    variant="permanent"
                    sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, border: 'none' }
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            {/* </Box> */}
        </div>
    );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;