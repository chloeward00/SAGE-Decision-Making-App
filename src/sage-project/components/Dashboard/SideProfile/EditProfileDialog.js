
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
import { Container, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import firebase from "../../../firebase/firebase";
import { useRouter } from 'next/router'
import fire from 'firebase/app'
import 'firebase/firestore';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';

const useStyles = makeStyles((theme) => ({
    textField: {
        margin: '10px auto'
    },
    editText: {
        color: theme.colours.gradient1
    },
    iconColor: {
        color: theme.colours.gradient1
    },
    nameIcon: {
        color: theme.colours.gradient1, 
    },
    bioIcon: {
        color: theme.colours.gradient1, 
        mr: 1, 
        my: 0.5
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

const EditProfileDialog = ({ userName, userBio }) => {
    
    const classes = useStyles();
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

    const [name, setName] = useState(userName);
    const [bio, setBio] = useState(userBio);

    let currentUserUID = fire.auth().currentUser.uid

    const handlePress = async () => {
                
        const db = fire.firestore();
        db.collection("users")
        .doc(currentUserUID)
        .update({
            userName: name,
            userBio: bio
        })
        router.push("/home")
    }

    const getUserInfo = async () => {
        
        let doc = await fire
        .firestore()
        .collection('users')
        .doc(currentUserUID)
        .get()
    
        if (!doc.exists){
            console.log('no profile saved in the database. edit profile now')
        } else {
            let dataObj = doc.data();
            setName(dataObj.userName)
            setBio(dataObj.userBio)
        }
    }

    useEffect(() => {
        let mounted = false

        if(!mounted){
            getUserInfo()
        }
            
        return () => {
            mounted = true
        }
    }, [])

    return (
        <div>
            <Button size="small" variant="outlined" onClick={handleClickOpen} startIcon={<EditIcon/>}   className={classes.editText}>
                {"EDIT PROFILE"}
            </Button>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                {"Edit your profile"}
            </BootstrapDialogTitle>
            <DialogContent>
                <Container sx={{ padding: '30px'}}>
                    <DialogContentText>
                    {"Enter the credentials you wish to change below."}
                    </DialogContentText>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: '20px', marginTop: '10px'}}>
                        <AccountCircle sx={{ mr: 1, my: 0.5 }} className={classes.iconColor} />
                        <TextField 
                            id="change-username"
                            defaultValue={name} 
                            label="Name" 
                            variant="standard"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end'}}>
                        <InfoIcon sx={{ mr: 1, my: 0.5 }} className={classes.iconColor} />
                        <TextField 
                            id="change-bio" 
                            defaultValue={bio}
                            label="Bio" 
                            variant="standard"
                            onChange={(e) => setBio(e.target.value)}
                        />        
                    </Box>
                </Container>
                    <DialogActions>
                    <Button className={classes.iconColor} autoFocus onClick={() => { 
                        handleClose()
                        handlePress()
                    }}>
                    {"Submit"} 
                    </Button>
                    </DialogActions>
                
                <Divider/>

                <Container sx={{ padding: '30px'}}>
                    <DialogContentText>
                    {"Change your password or email or delete your account."}
                    </DialogContentText>
                    <List sx={{ marginTop: '10px'}}>
                        <ListItem disablePadding>
                            {/* CHANGE THIS */}
                            <ListItemButton onClick={ () => router.push(`/profile/changeemail/${currentUserUID}`)}>
                                <ListItemIcon>
                                    <EmailIcon className={classes.iconColor} />
                                </ListItemIcon>
                                <ListItemText primary="Change Email" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={ () => router.push(`/profile/changepassword/${currentUserUID}`)}>
                                <ListItemIcon>
                                    <LockIcon className={classes.iconColor} />
                                </ListItemIcon>
                                <ListItemText primary="Change Password" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={ () => router.push(`/profile/deleteaccount/${currentUserUID}`)}>
                                <ListItemIcon>
                                    <DeleteIcon className={classes.iconColor} />
                                </ListItemIcon>
                                <ListItemText primary="Delete Account" />
                            </ListItemButton>
                        </ListItem>
                    </List>                    
                </Container>
            </DialogContent>
            </Dialog>
        </div>
    );
}

export default EditProfileDialog;