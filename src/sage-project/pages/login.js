import { makeStyles } from '@mui/styles';
import { Paper, TextField, Typography, Grid, Button, Divider} from '@mui/material';
import Link from '../components/Link';
import { message } from "antd";
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

    useEffect(() => {
        if (firebase.isLoggedIN()) {
            Router.push("/dashboard");
        }
        }, []);

        // Login
        async function doLogin(values) {
        console.log(values); // Expected output {email: "me@thetuhin.com", password: "123456789"}
        message.loading({ key: "login", content: "Logging in.." }); // Showing logging in message
        try {
            await firebase.login(values);
            message.success({ key: "login", content: "Logged in 🎉" }); // if success
            Router.push("/dashboard");
        } catch (error) {
            // if error arises
            message.error({
            key: "login",
            content: error.message || "Ooops! Something went wrong!",
            });
        }
    }
    
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const onSubmit = (data) => console.log(data);

    const classes = useStyles()

    return ( 
        <>
            <Grid>
                <Paper elevation={20} className={classes.formStyle}>
                    <Grid>
                        <Typography variant="h4" gutterBottom className={classes.login}>
                            Log in
                        </Typography>
                    </Grid>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            id="outlined-basic" 
                            label="Email" 
                            variant="outlined"
                            // required
                            fullWidth  
                            className={classes.textField}
                            {...register("email", {required: "Please enter a valid email address"})}
                            error={!!errors?.email}
                            helperText={errors?.email ? errors.email.message : null}
                        />
                        <TextField
                            id="outlined-basic" 
                            label="Password" 
                            variant="outlined"
                            type="password"
                            // required
                            fullWidth
                            className={classes.textField}
                            {...register("password", {required: "Please enter your password"})}
                            error={!!errors?.password}
                            helperText={errors?.password ? errors.password.message : null}
                        />
                        <Typography>
                            <Link href="/resetpassword" underline="none">
                                    Forgot your password?
                            </Link>
                        </Typography>
                        <Grid container item className={classes.button}>
                            <Button 
                                type="submit" 
                                variant="contained" 
                                className={classes.buttonStyle}
                                size="large"
                            >
                                Log in
                            </Button>
                        </Grid>
                        <Divider variant="middle" className={classes.divider}/>
                        <Typography gutterBottom>
                            {"Don't have an account yet?"}
                            <Link href="/signup" underline="none" className={classes.signUpStyle}>
                                Sign up
                            </Link>
                        </Typography>
                    </form>
                </Paper>
            </Grid>
        </>
     );
}
 
export default Login;
