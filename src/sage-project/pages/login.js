import { makeStyles } from '@mui/styles';
import { Paper, TextField, Typography, Grid, Button, Divider, Container} from '@mui/material';
import Link from '../components/Link/Link';
import firebase from "../firebase/firebase";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import LeftGrid from '../components/Authentication/LeftGrid';


const caption = "Welcome back! To keep connected with us please login with your personal info. ";
const login = "Log in";
const forgotPass = "Forgot your password?";
const dontHaveAccount = "Don't have an account yet?";
const signUp = "Sign up";

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
        // margin: '20vh auto',
        width: 500,     
        [theme.breakpoints.down('sm')]: {
            width: 300,
        }
    },
    buttonStyle: {
        backgroundColor: '#5082B3',
        '&:hover': {
            backgroundColor: '#6392C0',
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
        color: '#5082B3'
    },
    signUpStyle: { 
        margin: 'auto 5px' 
    },
    divider: {
        margin: '20px auto'
    },
    leftGrid: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightGrid: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
}))

const Login = () => {

    // const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        if (firebase.isLoggedIN()) {
            Router.push("/home");
        }
    }, []);

    // Login
    async function doLogin(values) {
        console.log(values); // Expected output {email: "me@thetuhin.com", password: "123456789"}
        // message.loading({ key: "login", content: "Logging in.." }); // Showing logging in message
        try {
            await firebase.login(values);
            // message.success({ key: "login", content: "Logged in 🎉" }); // if success
            Router.push("/home");
        } catch (error) {
            // if error arises
            // message.error({
            // key: "login",
            // content: error.message || "Ooops! Something went wrong!",
            // });
            alert(error)
            console.log(error);
        }
    }
    
    const { register, handleSubmit, formState: { errors }, } = useForm();

    const classes = useStyles()

    return ( 
        <div>
            <Grid container style={{ backgroundColor: '#A9B5DD', minHeight: "100vh" }}>
                <Grid item xs={12} sm={12} md={6} className={classes.leftGrid}>
                    <LeftGrid caption={caption}/>
                </Grid>
                <Grid item xs={12} sm={12} md={6} className={classes.rightGrid}>
                    <Paper elevation={10} className={classes.formStyle}>
                        <Grid>
                            <Typography variant="h4" gutterBottom className={classes.login}>
                                {login}
                            </Typography>
                        </Grid>
                        <form onSubmit={handleSubmit(doLogin)}>
                            <TextField
                                id="email" 
                                label="Email" 
                                variant="outlined"
                                fullWidth
                                className={classes.textField}
                                {...register("email", {
                                    required: "Please enter your email address",
                                    pattern: {
                                        value: /^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                        message: 'Invalid email address'}})}
                                error={!!errors?.email}
                                helperText={errors?.email ? errors.email.message : null}
                            />
                            <TextField
                                id="password" 
                                label="Password"
                                variant="outlined"
                                type="password"
                                fullWidth
                                className={classes.textField}
                                {...register("password", {
                                    required: "Please enter your password",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be more than 6 characters."
                                    }})}
                                error={!!errors?.password}
                                helperText={errors?.password ? errors.password.message : null}
                            />
                            <Typography>
                                <Link href="/resetpassword" underline="none">
                                        {forgotPass}
                                </Link>
                            </Typography>
                            <Grid container item className={classes.button}>
                                <Button 
                                    type="submit" 
                                    variant="contained" 
                                    className={classes.buttonStyle}
                                    size="large"
                                >
                                    {login}
                                </Button>
                            </Grid>
                            <Divider variant="middle" className={classes.divider}/>
                            <Typography gutterBottom>
                                {dontHaveAccount}
                                <Link href="/signup" underline="none" className={classes.signUpStyle}>
                                    {signUp}
                                </Link>
                            </Typography>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </div>
     );
}

export default Login;

// the width of a grid is 12. so if you say for small screens (xs) = 12, that means it takes the whole width
// if sm = 6, that takes half of the screen
