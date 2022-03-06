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
import { useState } from 'react';
import 'firebase/firestore';
import 'firebase/auth'
import fire from 'firebase/app'


const InviteDialog = () => {

    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [email, setEmail] = useState('');
    const [member, setMember] = useState('');

    // this is how to get the users details to be added into a group from the user collection. how do we know if this user does not exist in the database?
    // this returns user ID / document reference from users collection
    const handleSubmit = () => {
        fire.firestore().collection('users').where("userEmail", "==", email)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                // setMember(doc.id)
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
    }

    // this should update the group collection -> group's members update
    // const updateGroupMembers = () => {
    //     fire.firestore().collection('users')
    //     .doc()
    //     .update({
    //         userGroups: fire.firestore.FieldValue.arrayUnion(member)
    //     })
    //     .catch((err) => {
    //         alert(err)
    //         console.log(err)
    //     })
    // }

    // const updateUserGroup = () => {
    //     fire.firestore().collection('users')
    //     .doc(fire.auth().currentUser.uid)
    //     .update({
    //         userGroups: fire.firestore.FieldValue.arrayUnion(...userGroups)
    //     })
    //     .catch((err) => {
    //         alert(err)
    //         console.log(err)
    //     })
    // }

    // useEffect(() => {

    // }, []);


    console.log('current email   ' + email)

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
                    onChange={(e) => setEmail(e.target.value)}
                    // className={classes.textField}
                />
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose}>
                    {"Cancel"}
                </Button>
                <Button autoFocus onClick={() => {
                    // handleSubmit({ groupMembers: [email]})
                    handleSubmit()
                    handleClose()
                }}>                    
                {"Add"}
                </Button>
            </DialogActions>
            </Dialog>
    </div>
    );
}

export default InviteDialog;


    // const checkThisEmail = "something@rv.com" 
    // const usersColl = fire.firestore().collection('users')
    // const query = usersColl.where("userEmail", "==", "bp").get()
    // if(!query.empty){
    //     console.log("this user exists")
    // } else {
    //     console.log("this user does not exist")
    // }

    // console.log(fire.auth().getUserByEmail("irene@rv.com"))
    // console.log(query ? "it exists" : "doesnt exist")
    // console.log(query)