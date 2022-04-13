import { makeStyles } from '@mui/styles';
import { Paper, TextField, Typography, Grid, Button, Divider, Container} from '@mui/material';
import firebase from "../../../firebase/firebase";
import { useRouter } from 'next/router'
import fire from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth'
import Stack from '@mui/material/Stack';

const useStyles = makeStyles( theme => ({
    textField: {
        [`& fieldset`]: {
              borderRadius: 10,
        }, 
        margin: '10px auto'
     },
    formStyle: {
        padding: '30px 30px',
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
    buttonDiv: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: theme.spacing(6)
    },
    textContainer: {
        marginTop: theme.spacing(4)
    }
}))

const DeleteAccount = () => {

    const classes = useStyles()
    const router  = useRouter();

    const userID = fire.auth().currentUser.uid
    console.log('user email hereee   ' + userID)

    async function doDelete() {
        deleteUserDoc()
        await firebase.deleteAccount()
        router.push("/")
    }

    const deleteUserDoc = () => {

        fire.firestore()
        .collection('users')
        .doc(userID)
        .delete()
        .then(() => {
            console.log('account has been deleted in the database')
        })
        .catch((err) => {
            alert(err)
            console.log(err)
        })
    }

    return (
        <div className={classes.root}>
            <Paper elevation={10} className={classes.formStyle}>
                <Typography variant="h4" gutterBottom className={classes.login}>
                    {"Delete Account"}
                </Typography>     
                <div className={classes.textContainer}>  
                <Typography gutterBottom>
                    {"Are you sure you want to delete your account?"}
                </Typography>         
                </div>
                <div className={classes.buttonDiv}>
                    <Stack direction="row" spacing={2}>
                        <Button
                            variant='contained'
                            className={classes.buttonStyle}
                            size="large"
                            onClick={doDelete}
                        >
                            {"Confirm"}
                        </Button>
                        <Button
                            variant='contained'
                            className={classes.buttonStyle}
                            size="large"
                            onClick={() => {router.push('/home')}}
                        >
                            {"Cancel"}
                        </Button>
                    </Stack>
                </div>
            </Paper>
        </div>
    );
}

export default DeleteAccount;
