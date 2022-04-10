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
import { useState, useEffect } from 'react';
import 'firebase/firestore';
import 'firebase/auth'
import fire from 'firebase/app'
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';


const useStyles = makeStyles((theme) => ({
    textField: {
        margin: '10px auto'
    }
}))

const BootstrapDialogTitle = (props) => {

    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
            <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};


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

    // these are the fields that group document has
    const [groupName, setGroupName] = useState('');
    const [groupDescription, setgroupDescription] = useState('');
    // initialised the current user as the first member of the group if they create a group.
    const [groupMembers, setGroupMembers] = useState([fire.auth().currentUser.uid]); // CHANGE THIS TO UID
    // this userGroups is a field under users collection -> this gets updated once a user creates a group.
    const [userGroups, setUserGroups] = useState([]);

    // this creates a new document in the groups collection. 
    // this represents each group created in the database.
    const createGroup = () => {
        
        let currentUserUID = fire.auth().currentUser.uid

        const docRef = fire.firestore().collection('groups').doc()
        docRef.set({
            groupName: groupName,
            groupDescription: groupDescription,
            groupMembers: groupMembers,
            groupID: docRef.id,
            createdAt: new Date(),
            groupAdmin: currentUserUID
        })
        .catch((err) => {
            alert(err)
            console.log(err)
        })
        // this saves the groups document ID into each user's userGroups array field
        setUserGroups([...userGroups, docRef.id])
    }

    // this should update the users collection -> update the userGroups array + add the created group in the array
    // fire.firestore.FieldValue.arrayUnion(...userGroups) ->  userGroups is an array so we use spread operator to get its values since the array only takes string values
    useEffect(() => {
        async function updateUserGroup() {

            await fire.firestore().collection('users')
            .doc(fire.auth().currentUser.uid)
            .update({
                userGroups: fire.firestore.FieldValue.arrayUnion(...userGroups)
            })  
            .catch((err) => {
                alert(err)
                console.log(err)
            })
        }

        updateUserGroup();
      }, [userGroups]);

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
            {/* <DialogTitle id="responsive-dialog-title">
                {buttonTitle}
            </DialogTitle> */}
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                {"Create a new group"}
            </BootstrapDialogTitle>
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
                <Button autoFocus onClick={ () => {
                    createGroup()
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