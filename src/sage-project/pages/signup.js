import { makeStyles } from '@mui/styles';
import { Paper, TextField, Typography, Grid, Button, Divider, Container} from '@mui/material';
import Link from '../components/Link';
import firebase from "../firebase/firebase";
import Router from "next/router";
import { useEffect } from "react";
import { useForm } from 'react-hook-form';
import LeftGrid from '../components/Authentication/LeftGrid';


const caption = "Enter your personal details and start planning with us!";
const createAccount = "Create account";
const alreadyHaveAccount = "Already have an account?";
const signUp = "Sign up";
const logIn = "Log in";

const useStyles = makeStyles( theme => ({
    textField: {
        [`& fieldset`]: {
              borderRadius: 10,
        },
        margin: '10px auto'
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
    logInStyle: {
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

const SignUp = () => {

    useEffect(() => { 
        if (firebase.isLoggedIN()) {
          Router.push("/dashboard");
        }
      });
    
      async function doSignup(values) {
        message.loading({ key: "SignedUp", content: "Signing up!" });
        try {
          await firebase.register(values);
          message.success({ key: "SignedUp", content: "You have successfully created your account!" }); // when signed up
          Router.push("/login");
        } catch (error) {
          // an error message which shows if account is not successfully created.
          message.error({
            key: "Create Account",
            content: error.message || "An error occurred when trying to create your account. Please try again.",
          });
        }
      }

    const { register, handleSubmit, formState: { errors }, } = useForm();
    const onSubmit = (data) => console.log(data);
    
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
                                {signUp}
                            </Typography>
                        </Grid>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <TextField
                                id="outlined-basic" 
                                label="Name" 
                                variant="outlined"
                                fullWidth 
                                className={classes.textField}
                                {...register("name", {
                                    required: "Please enter your name"})}
                                error={!!errors?.name}
                                helperText={errors?.name ? errors.name.message : null} 
                            />
                            <TextField
                                id="outlined-basic" 
                                label="Email" 
                                variant="outlined"
                                fullWidth
                                className={classes.textField}
                                {...register("email", {
                                    required: "Please enter your email address",
                                    pattern: {
                                        value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                        message: 'Invalid email address'}})}
                                error={!!errors?.email}
                                helperText={errors?.email ? errors.email.message : null}
                            />
                            <TextField
                                id="outlined-basic" 
                                label="Password" 
                                variant="outlined"
                                type="password"
                                fullWidth
                                className={classes.textField}
                                {...register("password", {
                                    required: "Please enter a password",
                                    minLength: {
                                        value: 6,
                                        message: "Incorrect password."
                                    }})}
                                error={!!errors?.password}
                                helperText={errors?.password ? errors.password.message : null}
                            />
                            <Grid container item className={classes.button}>
                                <Button 
                                    type='submit'
                                    variant='contained'
                                    className={classes.buttonStyle}
                                    size="large"
                                >
                                    {createAccount}
                                </Button> 
                            </Grid>
                            <Divider variant="middle" className={classes.divider}/>
                            <Typography gutterBottom>
                                {alreadyHaveAccount}
                                <Link href="/login" underline="none" className={classes.logInStyle}>
                                    {logIn}
                                </Link>
                            </Typography>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </div>
     );
}
 
export default SignUp;