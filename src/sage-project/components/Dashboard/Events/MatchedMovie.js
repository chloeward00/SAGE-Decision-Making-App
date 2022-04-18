import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useState, useEffect } from 'react';
import fire from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth'


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

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

export default function MatchedMovieDialog({ eventID, groupID }) {
    
    const [open, setOpen] = React.useState(false);
    const [name, setName] = useState('')
    const [releasedDate, setReleasedDate] = useState('')
    const [imageURL, setImageURL] = useState('')
    const [overview, setoverview] = useState('') 
    const [category, setCategory] = useState('')

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        let isMounted = true;

        async function fetchMatchedData() {

            await fire.firestore()
            .collection("groupTopMatch")
            .doc(eventID)
            .onSnapshot((querySnapshot) => {
                if(isMounted){
                    setName(querySnapshot.data().solution.name)
                    setImageURL(querySnapshot.data().solution.imgUrl)
                    setReleasedDate(querySnapshot.data().solution.releaseDate)
                    setoverview(querySnapshot.data().solution.overView)
                }
            });
        }

        async function fetchCategory() {

            await fire.firestore()
            .collection("groupsCategory")
            .doc(groupID)
            .collection('events')
            .doc(eventID)
            .onSnapshot((querySnapshot) => {
                if(isMounted){
                    setCategory(querySnapshot.data().eventCategory)
                }
            });
        }

        fetchCategory()
        fetchMatchedData()
        
        return () => {
            isMounted = false
        }

    }, []);

    console.log(category)

  return (
        <div>
            <Button size="small" onClick={handleClickOpen}>
                See matched event
            </Button>
                <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                {category.toUpperCase()}
            </BootstrapDialogTitle>
            <DialogContent>
            <Box display="flex" justifyContent="center" alignItems="center">
                <Box
                    component="img"
                    sx={{
                        height: 400,
                        width: 250,
                    }}
                    alt=""
                    src={imageURL}
                />
            </Box>
                
                <Typography variant="h5" align='center' sx={{ paddingTop: 2}} gutterBottom>
                        {name}
                </Typography>

                {/* location */}
                <Stack spacing={1} direction="row" >
                    <Typography variant="subtitle1" sx={{ fontWeight: 600}}>
                            {"Overview:"}
                    </Typography>
                    <Typography variant="subtitle1">
                            {overview}
                    </Typography>
                </Stack>

                <Stack spacing={1} direction="row" >
                    <Typography variant="subtitle1"  sx={{ fontWeight: 600}}>
                            {"Released Date:"}
                    </Typography>
                    <Typography variant="subtitle1">
                            {releasedDate}
                    </Typography>
                </Stack>

            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose}>
                    Close
                </Button>
            </DialogActions>
            </BootstrapDialog>
        </div>
    );
}
