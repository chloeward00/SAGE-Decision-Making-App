import { makeStyles } from '@mui/styles';
import { Paper, TextField, Typography, Grid, Button} from '@mui/material';
import Link from '../components/Link';
import { message } from 'antd';
import firebase from "./../firebase/firebase";
import { useState } from 'react';
import Router from "next/router";
import LeftGrid from '../components/Authentication/LeftGrid';


const caption = "No worries! We will help you reset and create a new password!";
const logIn = "Log in";
const forgotPass = "Forgot your password?";
const helpText = "Please enter your email address below and we'll send you a link to reset your password.";
const resetLink = "send reset link";

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
    caption: {
        color: '#808080'
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

const ResetPassword = () => {

    const profile = firebase.getProfile();

    const [fieldDict, setInputs] = useState({
        emailaddress: ''
    })
  
    async function doChange(values) {
        message.loading({ key: "Reset Password", content: "Changing password" });
        alert("email" + fieldDict.emailaddress)
        try {
                await firebase.resetPassword(fieldDict.emailaddress)
                message.success({ key: "Reset Password", content: "A reset email has been sent to the email address provided" }); // when signed up
                Router.push("/login");
                } catch (error) {
                message.error({
                    key: "Reset Password",
                    content: error.message || "An error occurred when trying to reset your password. Please try again.",
                });
                }
        }

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
                                {forgotPass}
                            </Typography>
                            <Typography variant="caption" gutterBottom className={classes.caption}>
                                {helpText}
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
                        <Grid container item className={classes.button}>
                            <Button
                                type='submit' 
                                variant='contained' 
                                className={classes.buttonStyle}
                                size="large"
                            >
                                {resetLink} 
                            </Button>
                        </Grid> 
                        <Typography gutterBottom>
                            <Link href="/login" underline="none" className={classes.logInStyle}>
                                {logIn}
                            </Link>
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </div>
     );
}

export default ResetPassword;