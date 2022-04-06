import firebase from "../../../firebase/firebase";
import Router from "next/router";
import fire from 'firebase/app'
import 'firebase/firestore';
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
import CategoriesCards from '../../Categories/CategoriesPage';
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



export default function EditProfileContent() {
    const profile = firebase.getProfile();
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");


    const handlePress = async () => {
        let currentUserUID = fire.auth().currentUser.uid
        const db = fire.firestore();
        db.collection("UserProfile")
        .doc(currentUserUID)
        .set({
        Name: name,
        Bio: bio
        })
        Router.push("/home")  
    }

    const getUserInfo = async () => {
        let currentUserUID = fire.auth().currentUser.uid
        
        let doc = await fire
        .firestore()
        .collection('UserProfile')
        .doc(currentUserUID)
        .get()
    
        if (!doc.exists){
            console.log('no profile saved in the database. edit profile now')
        } else {
            let dataObj = doc.data();
            setName(dataObj.Name)
            setBio(dataObj.Bio)
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
    <Container sx={{ padding: '30px'}}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: '20px' }}>
            <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField 
                id="change-username" 
                label="Name" 
                variant="standard"
                onChange={(e) => setName(e.target.value)}
            />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', }}>
            <InfoIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField 
                id="change-bio" 
                label="Bio" 
                variant="standard"
                onChange={(e) => setBio(e.target.value)}
            />        
        </Box>

    </Container>
  );
}