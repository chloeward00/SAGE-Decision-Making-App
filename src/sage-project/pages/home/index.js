import ResponsiveDrawer from "../../components/Dashboard/Drawer/SideDrawer";
// import { Paper, TextField, Typography, Grid, Button, Divider, Container} from '@mui/material';
import { makeStyles } from '@mui/styles';
import Events from "../../components/Dashboard/Events/Events";
import Layout from "../../components/Layout/Layout";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    }
}))

export default function HomeDashboard() {
    
    const classes = useStyles();

    return (
        <div>
            <Layout>
                <Events/>
            </Layout>
        </div>
    );
}

// wrap layout component