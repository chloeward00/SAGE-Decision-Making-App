import { makeStyles } from '@mui/styles';
import { Paper, TextField, Typography, Grid, Button} from '@mui/material';
import Link from '../components/Link';
import { message } from 'antd';
import firebase from "./../firebase/firebase";
import { useState } from 'react';
import Router from "next/router";

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
    caption: {
        color: '#808080'
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
        <>
            <Grid>
                <Paper elevation={20} className={classes.formStyle}>
                    <Grid>
                        <Typography variant="h4" gutterBottom className={classes.login}>
                            Forgot your password?
                        </Typography>
                        <Typography variant="caption" gutterBottom className={classes.caption}>
                            {"Please enter your email address below and we'll send you a link to reset your password."}
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
                                Send reset link 
                            </Button>
                        </Grid> 
                        <Typography gutterBottom>
                            <Link href="/login" underline="none" className={classes.logInStyle}>
                                Log in
                            </Link>
                        </Typography>
                </Paper>
            </Grid>
        </>
     );
}
 
export default ResetPassword;