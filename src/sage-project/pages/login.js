import { makeStyles } from '@mui/styles';
import { Paper, TextField, Typography, Grid, 
Button, Divider} from '@mui/material';
import Link from '../components/Link';
// import AuthBanner from '../components/AuthBanner'

const useStyles = makeStyles( theme => ({
    textField: {
        [`& fieldset`]: {
              borderRadius: 10,
        }, 
        margin: '10px auto'
     },
    logo: {
        marginTop: 20,
        marginLeft: 30 
    },
    formStyle: {
        padding: '30px 30px',
        margin: '20vh auto',
        width: 500, 
    },
    buttonStyle: {
        backgroundColor: '#357C93',
        '&:hover': {
            backgroundColor: '#357C93',
        },
        borderRadius: 20,
        width: '50%',
    },
    button: {
        justifyContent: 'center',
        margin: '10px auto'
    },
    login: {
        fontWeight: 600,
        color: '#357C93'
    },
    signUpStyle: { 
        margin: 'auto 5px' 
    },
    divider: {
        margin: '20px auto'
    }
}))

const Login = () => {
    const classes = useStyles()

    return ( 
        <>
            {/* <AuthBanner/> */}
            <Grid>
                <Paper elevation={20} className={classes.formStyle}>
                    <Grid>
                        <Typography variant="h4" gutterBottom className={classes.login}>
                            Log in
                        </Typography>
                    </Grid>
                        <TextField
                            id="outlined-basic" 
                            label="Email" 
                            variant="outlined"
                            required
                            fullWidth 
                            className={classes.textField} 
                        />
                        <TextField
                            id="outlined-basic" 
                            label="Password" 
                            variant="outlined"
                            type="password"
                            required
                            fullWidth
                            className={classes.textField}
                        />
                        <Typography>
                            <Link href="/" underline="none">
                                    Forgot your password?
                            </Link>
                        </Typography>

                        <Grid container item className={classes.button}>
                            <Button 
                                type='submit' 
                                variant='contained' 
                                className={classes.buttonStyle}
                                size="large"
                            >
                                Log in
                            </Button>
                        </Grid>
                        <Divider variant="middle" className={classes.divider}/>
                        <Typography gutterBottom>
                            Don't have an account yet?
                            <Link href="/signup" underline="none" className={classes.signUpStyle}>
                                Sign up
                            </Link>
                        </Typography>
                </Paper>
            </Grid>
        </>
     );
}
 
export default Login;