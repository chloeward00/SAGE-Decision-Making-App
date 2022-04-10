

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
import { makeStyles } from '@mui/styles';
import { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EventIcon from '@mui/icons-material/Event';
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

const EditEventDialog = ({ groupID }) => {

    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [maxWidth, setMaxWidth] = React.useState('md');


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // useEffect(() => {
    //     async function updateUserGroup() {

    //         await fire.firestore().collection('users')
    //         .doc(fire.auth().currentUser.uid)
    //         .update({
    //             userGroups: fire.firestore.FieldValue.arrayUnion(...userGroups)
    //         })  
    //         .catch((err) => {
    //             alert(err)
    //             console.log(err)
    //         })
    //     }

    //     updateUserGroup();
    //   }, [userGroups]);


    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen} startIcon={<AddCircleIcon />}>
                {"EDIT EVENT"}
            </Button>
            <Dialog
                fullScreen={fullScreen}
                // sx={{ maxWidth: '100%'}}
                // maxWidth={maxWidth}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                {"Edit Event Details"}
            </BootstrapDialogTitle>
            <DialogContent>
                <DialogContentText>
                    {"Update the event details below."}
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="group-name"
                    label="Event Name"
                    type="email"
                    fullWidth
                    variant="standard"
                    onChange={(e) => setUserEmail(e.target.value)}
                    // className={classes.textField}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="group-name"
                    label="Event Date"
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
            </DialogActions>
            </Dialog>
        </div>
    );
}

export default EditEventDialog;