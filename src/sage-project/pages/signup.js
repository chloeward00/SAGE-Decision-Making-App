import { makeStyles } from '@mui/styles';
import { Paper, TextField, Typography, Grid, Button, Divider} from '@mui/material';
import Link from '../components/Link';
// import AuthBanner from '../components/AuthBanner'

const useStyles = makeStyles( theme => ({
    textField: {
        [`& fieldset`]: {
              borderRadius: 10,
        },
        margin: '10px auto'
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
    logInStyle: {
        margin: 'auto 5px'
    },
    divider: {
        margin: '20px auto'
    }
}))

const SignUp = () => {
    const classes = useStyles()

    return ( 
        <>
            {/* <AuthBanner/> */}
            <Grid>
                <Paper elevation={20} className={classes.formStyle}>
                    <Grid>
                        <Typography variant="h4" gutterBottom className={classes.login}>
                            Sign up
                        </Typography>
                    </Grid>
                        <TextField
                            id="outlined-basic" 
                            label="Name" 
                            variant="outlined"
                            required
                            fullWidth 
                            className={classes.textField} 
                        />
                        <TextField
                            id="outlined-basic" 
                            label="Email" 
                            variant="outlined"
                            type="password"
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
                        <Grid container item className={classes.button}>
                            <Button 
                                type='submit'
                                variant='contained'
                                className={classes.buttonStyle}
                                size="large"
                            >
                                Create account
                            </Button> 
                        </Grid>
                        <Divider variant="middle" className={classes.divider}/>
                        <Typography gutterBottom>
                            Already have an account?
                            <Link href="/login" underline="none" className={classes.logInStyle}>
                                Log in
                            </Link>
                        </Typography>
                </Paper>
            </Grid>
            </>
     );
}
 
export default SignUp;