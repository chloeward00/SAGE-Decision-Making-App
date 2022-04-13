import { makeStyles } from '@mui/styles';
import { Paper, TextField, Typography, Grid, Button, Divider, Container} from '@mui/material';
import firebase from "../../../firebase/firebase";
import { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router'
import { message } from 'antd';
import fire from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth'

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
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#A9B5DD', 
        minHeight: "100vh"
    },
}))

const ChangeEmail = () => {

    const classes = useStyles()
    const router  = useRouter();

    const userID = router.query.email
    console.log('user email hereee   ' + userID)

    const updateUserEmail = (newemail) => {

        fire.firestore()
        .collection('users')
        .doc(userID)
        .update({
            userEmail: newemail
        })
        .catch((err) => {
            alert(err)
            console.log(err)
        })

        router.push("/home");

    }

    async function doChange(values) {
        
        message.loading({ key: "Change email address", content: "Attempting to change email address" });
        
        if (values.currentemail === values.newemail){
            alert("Duplicate emails new email cannot be the same as old email.")
        } else if (values.currentemail !== values.newemail) {
            try {
                await firebase.updateUsersEmail(values.password, values.newemail)
                message.success({ key: "Change email address", content: "You have successfully changed your accounts email address" }); // when signed up
                updateUserEmail(values.newemail)
            } catch (error) {
            // an error message which shows if email address isn't successfully updated
                message.error({
                    key: "Change email address",
                    content: error.message || "An error occurred when trying to change your accounts email address. Please try again.",
                });
            }
        }
    }

    const { register, handleSubmit, formState: { errors }, } = useForm();

    return (
        <div className={classes.root}>
            <Paper elevation={10} className={classes.formStyle}>
                <Grid>
                    <Typography variant="h4" gutterBottom className={classes.login}>
                        {"Change Email Address"}
                    </Typography>
                </Grid>
                <form onSubmit={handleSubmit(doChange)}>
                    <TextField
                        id="currentemail" 
                        label="Current Email"
                        variant="outlined"
                        fullWidth
                        className={classes.textField}
                        {...register("currentemail", {
                            required: "Please enter your current email address",
                            pattern: {
                                value: /^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                message: 'Invalid email address'}})}
                        error={!!errors?.currentemail}
                        helperText={errors?.currentemail  ? errors.currentemail.message : null}
                    />
                    <TextField
                        id="newemail" 
                        label="New Email" 
                        variant="outlined"
                        fullWidth
                        className={classes.textField}
                        {...register("newemail", {
                            required: "Please enter your new email address",
                            pattern: {
                                value: /^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                message: 'Invalid email address'}})}
                        error={!!errors?.newemail}
                        helperText={errors?.newemail ? errors.newemail.message : null}
                    />
                    <TextField
                        id="password"
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
                            {"Change Email"}
                        </Button> 
                    </Grid>
                </form>
            </Paper>
        </div>
     );
}

export default ChangeEmail;
