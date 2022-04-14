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
import { useForm } from 'react-hook-form';


const InviteDialog = ({ groupName }) => {

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
    const [emailError, setEmailError] = useState('')
  
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
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // console.log(doc.id, " => ", doc.data());
                    setGroupDocRef(doc.id)
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
        }

        getGroupDocRef();
    });

    // THIS RETURNS THE DOC REFERENCE OF THE USERS TO BE ADDED IN THE GROUP
    useEffect(() => {
    async function getUserDocRef() {
        
        await fire.firestore().collection('users').where("userEmail", "==", userEmail)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setMembers(doc.id)
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
    }

        getUserDocRef();
    }, [userEmail]);


    // const checkUserExistence = () => {
    //     fire.firestore()
    //     .collection('users').where("userEmail", "==", userEmail)
    //     .get()
    //     .then((querySnapshot) => {
    //         querySnapshot.forEach((doc) => {
    //             setEmailError(doc.id)
    //             console.log('added to the databse  ' + doc.id)
    //         });
    //     })
    //     .catch((error) => {
    //         console.log("Error getting documents: ", error);
    //     });    

    //     console.log("anunaaaa ")
    // }

    return (
    //     <div>
    //         <Button variant="outlined" onClick={handleClickOpen} startIcon={<AddCircleIcon />}>
    //             {"Add a member"}
    //         </Button>
    //         <Dialog
    //             fullScreen={fullScreen}
    //             open={open}
    //             onClose={handleClose}
    //             aria-labelledby="responsive-dialog-title"
    //         >
    //         <DialogTitle id="responsive-dialog-title">
    //             {"Add a member"}
    //         </DialogTitle>
    //         <form onSubmit={handleSubmit(checkUserExistence)}>
    //         {/* <form noValidate autoComplete='off' onSubmit={handleAddMember}> */}
    //         <DialogContent>
    //             <DialogContentText>
    //                 {"Add a member to your group by adding their email address below."}
    //             </DialogContentText>
    //             <TextField
    //                 autofocus
    //                 margin="dense"
    //                 id="email" 
    //                 label="Email" 
    //                 variant="standard"
    //                 fullWidth
    //                 required
    //                 {...register("email", {
    //                     required: "Please enter a valid email address",
    //                     pattern: {
    //                         value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
    //                         message: 'Invalid email address'
    //                     }})}
    //                 error={!!errors?.email}
    //                 helperText={errors?.email ? errors.email.message : null}
    //             />            
    //             {/* <TextField
    //                 autoFocus
    //                 margin="dense"
    //                 id="group-name"
    //                 label="Email"
    //                 type="email"
    //                 fullWidth
    //                 variant="standard"
    //                 onChange={(e) => setUserEmail(e.target.value)}
    //                 // className={classes.textField}
    //             /> */}
    //         </DialogContent>
    //         <DialogActions>
    //             <Button autoFocus onClick={handleClose}>
    //                 {"Cancel"}
    //             </Button>
    //             {/* <Button autoFocus onClick={() => {
    //                 updateGroupMembers()
    //                 updateUserGroup()
    //                 handleClose()
    //             }}>                     */}
    //             <Button autoFocus type='submit'>       
    //             {"Add"}
    //             </Button>
    //         </DialogActions>
    //         </form>
    //         </Dialog>
    // </div>
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
                    onChange={(e) => setUserEmail(e.target.value)}
                    // className={classes.textField}
                />
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose}>
                    {"Cancel"}
                </Button>
                <Button autoFocus onClick={() => {
                    updateGroupMembers()
                    updateUserGroup()
                    handleClose()
                }}>                    
                {/* <Button autoFocus type='submit'>        */}
                {"Add"}
                </Button>
            </DialogActions>
            </Dialog>
    </div>
    );
}

export default InviteDialog;
