import { makeStyles } from '@mui/styles';
import { Typography, Grid, Button, Divider, Container, Box } from '@mui/material';

const imageURL = 'https://images.unsplash.com/photo-1554034483-04fda0d3507b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
const caption = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris molestie sollicitudin auctor. Praesent faucibus venenatis dictum.'

const useStyles = makeStyles((theme) => ({
    background: {
        height: '50vh',
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0)), url(${imageURL})`,
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