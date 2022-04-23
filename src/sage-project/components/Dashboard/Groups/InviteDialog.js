import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import 'firebase/firestore';
import 'firebase/auth'
import fire from 'firebase/app'
import SuccessSnackbar from '../../SnackBar/SnackBar';
import { useRouter } from 'next/router'


const InviteDialog = ({ groupName }) => {

    const router = useRouter()
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // this records the docRef of the group the user is currently on
    const [groupDocRef, setGroupDocRef] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [members, setMembers] = useState('');
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [setter, setSetter] = useState('')
    
    const [emailError, setEmailError] = useState('')
    const [noEmailError, setNoEmailError] = useState(false)
    
    const [userNotFoundError, setUserNotFoundError] = useState('')
    const [noUser, setNoUser] = useState(false)

    const handleSnackBar = () => {

        if (userEmail == '') {
            setSetter('Please enter an email address')
            setEmailError('Please enter an email address')
            setNoEmailError(true)

        } else if (noUser == true) {
            console.log('there is NO USER', userEmail)

            setSetter('This email does not exist in the database.')            
            setUserNotFoundError('This email does not exist in the database.')            
            setNoEmailError(false)
            setEmailError('')

        } else if (noUser == false) {
            console.log('there is a user', userEmail)
            updateGroupMembers()
            updateUserGroup()
            setSetter('')
            setUserNotFoundError('')            
            setNoEmailError(false)
            setEmailError('')
            setOpenSnackBar(true)   
        }
    }

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar(false);
        setOpen(false);
    };
    
    // this should update the group collection -> group's members update
    const updateGroupMembers = () => {

        fire.firestore().collection('groups')
        .doc(groupDocRef)
        .update({
            groupMembers: fire.firestore.FieldValue.arrayUnion(members)
        })
        .catch((err) => {
            alert(err)
            console.log(err)
        })
    }

    // THIS UPDATE THE userGroups UNDER USER COLLECTION 
    const updateUserGroup = () => {
        fire.firestore().collection('users')
        .doc(members)
        .update({
            userGroups: fire.firestore.FieldValue.arrayUnion(groupDocRef)
        })
        .catch((err) => {
            alert(err)
            console.log(err)
        })
    }

    // THIS RETURNS THE DOC REFERENCE ID OF THE GROUP THE USER IS CURRENTLY ON
    // this will be on its own use effect since we want to run it once this component is called - this will run the first render
    useEffect(() => {
        async function getGroupDocRef() {

            await fire.firestore().collection('groups').where("groupName", "==", groupName)
            // .get()
            .onSnapshot((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // console.log(doc.id, " => ", doc.data());
                    setGroupDocRef(doc.id)
                });
            }, error => {
                console.log("Error getting documents: ", error);
            })  
        }

        getGroupDocRef();
    });

    // THIS RETURNS THE DOC REFERENCE OF THE USERS TO BE ADDED IN THE GROUP
    useEffect(() => {
    async function getUserDocRef() {
        
        await fire.firestore().collection('users').where("userEmail", "==", userEmail)
        .onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setMembers(doc.id)
            });
        }, error => {
            console.log("Error getting documents: ", error);
        })  
    }

        getUserDocRef();
    }, [userEmail]);

    const allUsers = () => {

        fire.firestore()
        .collection('users')
        .where("userEmail", "==", userEmail)
        .onSnapshot((querySnapshot) => {
            if(querySnapshot.docs.length == 0){
                // no user
                setNoUser(true)
            } else {
                setNoUser(false)
            }
        }, error => {
            console.log("Error getting documents: ", error);
        })

    }

    useEffect(() => {
        allUsers()
    }, [userEmail]);

    // console.log("cheking no usre hting here",noUser)
    
    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen} startIcon={<AddCircleIcon />}>
                {"Add a member"}
            </Button>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
            <DialogTitle id="responsive-dialog-title">
                {"Add a member"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {"Add a member to your group by adding their email address below."}
                </DialogContentText>    
                <TextField
                    autoFocus
                    margin="dense"
                    id="group-name"
                    label="Email"
                    type="email"
                    fullWidth
                    variant="standard"
                    required
                    error={setter == 'This email does not exist in the database.' ? noUser : noEmailError}
                    helperText={emailError == '' ? userNotFoundError : emailError}
                    onChange={(e) => setUserEmail(e.target.value)}
                    // className={classes.textField}
                />
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose}>
                    {"Cancel"}
                </Button>
                <Button autoFocus onClick={() => {
                    // updateGroupMembers()
                    // updateUserGroup()
                    handleSnackBar()
                }}>                    
                {/* <Button autoFocus type='submit'>        */}
                {"Add"}
                </Button>
                <SuccessSnackbar message={"Member has been added to the group!"} openSnack={openSnackBar} onClose={handleCloseSnackbar}/>
            </DialogActions>
            </Dialog>
    </div>
    );
}

export default InviteDialog;
