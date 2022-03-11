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
import { useRouter } from 'next/router'
import { makeStyles } from '@mui/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    active: {
        // backgroundColor: '#FAFAFB',
        backgroundColor: '#EFD3D7',
    },
    icons: {
        marginLeft: '30px',
        // color: '#194F92',
    },
    text: {
        marginLeft: '-10px',
        // color: '#194F92',
        fontWeight: 800,
    },
    listContainer: {
        // marginTop: '50px'
        // padding: '0px',
        // backgroundColor: '#DBC2D9'
    },
    logo: {
        // backgroundColor: '#EFD3D7',
        padding: '20px'
    }
}))

function ResponsiveDrawer(props) {
    
    const router = useRouter();
    const classes = useStyles();

    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    console.log("AHHHHHHHH   " + router.query)

    const itemsList = [
        {
            text: "Dashboard",
            icon: <DashboardIcon/>,
            path: '/home',
            onClick: () => router.push('/home')
        },
        {
            text: "Notifications",
            icon: <NotificationsIcon/>,
            path: '/home/notifications',
            onClick: () => router.push('/home/notifications')
        },
        {
            text: "Calendar",
            icon: <CalendarTodayIcon/>,
            path: '/home/calendar',
            onClick: () => router.push('/home/calendar')
        },
        {
            // make sure this is active too for every individual group = pathname -> /groups/[group]
            text: "Groups",
            icon: <GroupsIcon/>,
            path: '/groups',
            onClick: () => router.push('/groups')
        },
    ]

    const drawer = (
        <div>
        {/* THIS TOOLBAR HERE WILL BE ADDED WITH THE SAGE LOGO OR JUST SAGE TEXT */}
        <Toolbar className={classes.logo}>
            <Typography align="center" variant="h3">
                {"SAGE"}
            </Typography>
        </Toolbar>
        {/* <Divider /> */}
        <List className={classes.listContainer}>
            {itemsList.map((item, index) => {
            const { text, icon, path, onClick } = item;
            return (
                <ListItem
                // button
                key={text} 
                onClick={onClick}
                className={router.pathname == item.path ? classes.active : null}
                >
                    {icon && <ListItemIcon className={classes.icons}>{icon}</ListItemIcon>}
                    <ListItemText primary={text} className={classes.text}/>
                </ListItem>
            )})}
        </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
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
            <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
            >
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
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: '#CBD5F0'},
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
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth},
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box>
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