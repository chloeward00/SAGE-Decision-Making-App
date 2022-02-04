import { makeStyles } from '@mui/styles';
import { Paper, TextField, Typography, Grid, Button, Divider} from '@mui/material';
import Link from '../components/Link';
import firebase from "../firebase/firebase";
import Router from "next/router";
import { useEffect } from "react";
import { useForm } from 'react-hook-form';

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

    useEffect(() => { 
        if (firebase.isLoggedIN()) {
          Router.push("/dashboard");
        }
      });
    
    //   async function doSignup(values) {
    //     message.loading({ key: "SignedUp", content: "Signing up!" });
    //     try {
    //       await firebase.register(values);
    //       message.success({ key: "SignedUp", content: "You have successfully created your account!" }); // when signed up
    //       Router.push("/login");
    //     } catch (error) {
    //       // an error message which shows if account is not successfully created.
    //       message.error({
    //         key: "Create Account",
    //         content: error.message || "An error occurred when trying to create your account. Please try again.",
    //       });
    //     }
    //   }

    const { register, handleSubmit, formState: { errors }, } = useForm();
    const onSubmit = (data) => console.log(data);
    
    const classes = useStyles()

    return ( 
        <>
            <Grid>
                <Paper elevation={20} className={classes.formStyle}>
                    <Grid>
                        <Typography variant="h4" gutterBottom className={classes.login}>
                            Sign up
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
                    </form>
                </Paper>
            </Grid>
            </>
     );
}
 
export default SignUp;