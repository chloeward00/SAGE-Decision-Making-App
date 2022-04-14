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

const ChangePassword = () => {

    const classes = useStyles()
    const router  = useRouter();

    async function doChange(values) {

        if (values.currentpassword === ''){
            console.log("No new password");
            alert('please enter a password')
        } else if (values.newpassword === '') {
            console.log("No new password");
            alert("Please enter your new password")
        } else if (values.currentpassword === values.newpassword) {
            alert("Duplicate Passwords new password cannot be the same as old password.")
        } else {
            try {
                await firebase.updatePasswords(values.currentpassword, values.newpassword)
                router.push("/home");
            } catch (error) {
                console.log(error)
            }
        }
    }

    const { register, handleSubmit, formState: { errors }, } = useForm();

    return (
        <div className={classes.root}>
            <Paper elevation={10} className={classes.formStyle}>
                <Grid>
                    <Typography variant="h4" gutterBottom className={classes.login}>
                        {"Change Password"}
                    </Typography>
                </Grid>
                <form onSubmit={handleSubmit(doChange)}>
                    <TextField
                        id="currentpassword"
                        label="Current Password" 
                        variant="outlined"
                        type="password"
                        fullWidth
                        className={classes.textField}
                        {...register("currentpassword", {
                            required: "Please enter a password",
                            minLength: {
                                value: 6,
                                message: "Incorrect password."
                            }})}
                        error={!!errors?.currentpassword}
                        helperText={errors?.currentpassword ? errors.currentpassword.message : null}
                    />  
                    <TextField
                        id="newpassword"
                        label="New Password" 
                        variant="outlined"
                        type="password"
                        fullWidth
                        className={classes.textField}
                        {...register("newpassword", {
                            required: "Please enter a password",
                            minLength: {
                                value: 6,
                                message: "Incorrect password."
                            }})}
                        error={!!errors?.newpassword}
                        helperText={errors?.newpassword ? errors.newpassword.message : null}
                    />
                    <Grid container item className={classes.button}>
                        <Button 
                            type='submit'
                            variant='contained'
                            className={classes.buttonStyle}
                            size="large"
                        >
                            {"Change Password"}
                        </Button> 
                    </Grid>
                </form>
            </Paper>
        </div>
     );
}

export default ChangePassword;
