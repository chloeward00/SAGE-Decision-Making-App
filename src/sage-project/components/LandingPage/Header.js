import { makeStyles } from '@mui/styles';
import { Typography, Button, Container, Box } from '@mui/material';

const imageURL = 'https://images.unsplash.com/photo-1554034483-04fda0d3507b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
const caption = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris molestie sollicitudin auctor. Praesent faucibus venenatis dictum.'

// vice city
const gradient1 = "#3494E6";
const gradient2 = "#EC6EAD";

// cyflt
const gradient3 =  'rgba(69 , 104, 220, 1)' // "#4568DC";
const gradient4 =  'rgba(176 , 106, 179, 1)' // "#B06AB3"; 

// atlas
const gradient5 =  'rgba(254,172,94,1)' // "#FEAC5E"
const gradient6 =  'rgba(199,121,208,1)' // "#C779D0"
const gradient7 =  'rgba(75,192,200,1)' // "#4BC0C8"

// dania
const gradient8 = 'rgba(190,147,197,1)'// #BE93C5
const gradient9 = 'rgba(123,198,204,1)' // #7BC6CC

// azur lane
const gradient10 = 'rgba(127,127,213,0.5)' //#7F7FD5
const gradient11 = 'rgba(134,168,231,1)' // #86A8E7

const useStyles = makeStyles((theme) => ({
    background: {
        height: '50vh',
        backgroundImage: `linear-gradient(${gradient11}, ${gradient10})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        display: 'flex',
        position: 'relative',
        justifyContent: 'center',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: '#fff',
        fontWeight: 450,
        fontSize: '112px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '76px',
        }
    },
    caption: {
        color: '#FFF',
        fontSize: '24px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '16px',
        }
    },
    buttonStyle: {
        borderRadius: 20,
    },
    buttonContainer: {
        paddingTop: theme.spacing(6),
        [theme.breakpoints.down('md')]: {
            paddingTop: theme.spacing(2),
        }
    }
}))

const Header = () => {
    const classes = useStyles()

    return (
        <Box className={classes.background}>
            <Container className={classes.container}>
                <Typography className={classes.title}>
                    SAGE
                </Typography>
                <Typography align="center" className={classes.caption}>
                    {caption}
                </Typography>
                <Box className={classes.buttonContainer}>
                    <Button variant="contained" href="/login" className={classes.buttonStyle}>
                        Get Started
                    </Button>
                </Box>
            </Container>
        </Box>
    );
}
 
export default Header;