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
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import 'firebase/firestore';
import 'firebase/auth'
import fire from 'firebase/app'


const useStyles = makeStyles((theme) => ({
    textField: {
        margin: '10px auto'
    }
}))

const CreateGroupDialog = ({ buttonTitle }) => {
    
    const classes = useStyles();
    
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // these are the fields that group document has. groupMembers is set to be empty here since it will be overwritten in the invite member functionality.
    const [groupName, setGroupName] = useState('');
    const [groupDescription, setgroupDescription] = useState('');
    // initialised the current user as the first member of the group if they create a group.
    const [groupMembers, setGroupMembers] = useState([fire.auth().currentUser.displayName]);

    // this creates a new document in the groups collection. this represents each group created in the database.
    const handleSubmit = (newDataObj) => {
        fire.firestore().collection('groups')
        .doc()
        .set(newDataObj)
        .catch((err) => {
            alert(err)
            console.log(err)
        })
    }

    // const userUID = fire.auth().currentUser.uid
    // const groupField = fire.firestore().collection('users').doc(userUID)
    // console.log("user id    " + userUID)

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen} startIcon={<AddCircleIcon />}>
                {buttonTitle}
            </Button>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
            <DialogTitle id="responsive-dialog-title">
                {buttonTitle}
            </DialogTitle>
            <DialogContent>
                {/* group name, group description, group members */}
                <DialogContentText>
                    {"To create a group, add a group name and description. (description is completely optional)"}
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="group-name"
                    label="Group Name"
                    fullWidth
                    variant="standard"
                    className={classes.textField}
                    onChange={(e) => setGroupName(e.target.value)}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="group-description"
                    label="Group Description"
                    fullWidth
                    variant="standard"
                    className={classes.textField}
                    onChange={(e) => setgroupDescription(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                {/* FRONTEND - change the colour buttons to indicate which is save and cancel */}
                <Button autoFocus onClick={handleClose}>
                    {"Cancel"}
                </Button>
                <Button autoFocus onClick={() => {
                    console.log("setting group memberss")
                    handleSubmit({ groupName, groupDescription, groupMembers, id: uuidv4(), createdAt: new Date() })
                    handleClose()
                }}>
                    {"Save"}
                </Button>
            </DialogActions>
            </Dialog>
        </div>
    );
}

export default CreateGroupDialog;