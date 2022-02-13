import { Typography, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles((theme) => ({
    container: {
        height: '50%',
        backgroundColor: '#B6BBC7',
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
    },
    copyright: {
        paddingTop: theme.spacing(3),

    },
    address: {
        paddingTop: theme.spacing(3)
    },
}))

const Footer = () => {
    
    const classes = useStyles();

    return (  
        <Box className={classes.container}>
            <Typography variant="body1" color="#fff" align="center">
                sage.info@gmail.com
            </Typography>
            <Typography variant="body1" color="#fff" align="center" className={classes.address}>
                Dublin City University
            </Typography>
            <Typography variant="body1" color="#fff" align="center">
                Dublin, Ireland
            </Typography>
            <Typography variant="body1" color="#fff" align="center" className={classes.copyright}>
                2022 SAGE. All Rights Reserved.
            </Typography>
        </Box>
    );
}
 
export default Footer;