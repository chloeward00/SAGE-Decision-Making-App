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

export default function MatchedMovieDialog({ eventName, eventID, eventCategory }) {
    
    const [open, setOpen] = React.useState(false);
    const [matchedEvent, setMatchedEvent] = useState({}) 

    function capitalizeFirstLetter(string) {
        return string[0].toUpperCase() + string.slice(1);
    }

    const categoryUP = capitalizeFirstLetter(eventCategory)

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
                    setMatchedEvent(querySnapshot.data())
                    // console.log("matcheddd  ", querySnapshot.data())
                }
            });
        }

        fetchMatchedData()
        
        return () => {
            isMounted = false
        }

    }, []);

    console.log('checking map heree  ', matchedEvent)

  return (
    <div>
        <Button size="small" onClick={handleClickOpen}>
            Start Matching
        </Button>
            <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
            {categoryUP}
        </BootstrapDialogTitle>
        <DialogContent dividers>
        <Box display="flex" justifyContent="center" alignItems="center">
            <Box
                component="img"
                sx={{
                    height: 400,
                    width: 250,
                }}
                alt=""
                src={matchedEvent.solution.imgUrl}
            />
        </Box>
            
            <Typography variant="h5" align='center' sx={{ paddingTop: 2}} gutterBottom>
                    {matchedEvent.solution.name}
            </Typography>

            {/* location */}
            <Stack spacing={1} direction="row" >
                <Typography variant="subtitle1" sx={{ fontWeight: 600}}>
                        {"Location:"}
                </Typography>
                <Typography variant="subtitle1">
                        {matchedEvent.solution.location}
                </Typography>
            </Stack>

            <Stack spacing={1} direction="row"  >
                <Typography variant="subtitle1"  sx={{ fontWeight: 600}}>
                        {"Rating:"}
                </Typography>
                <Typography variant="subtitle1">
                        {matchedEvent.solution.rating}
                </Typography>
            </Stack>

            <Stack spacing={1} direction="row" >
                <Typography variant="subtitle1"  sx={{ fontWeight: 600}}>
                        {"Review Count:"}
                </Typography>
                <Typography variant="subtitle1">
                        {matchedEvent.solution.reviewCount}
                </Typography>
            </Stack>
            

        </DialogContent>
        <DialogActions>
            <Button autoFocus onClick={handleClose}>
                Save changes
            </Button>
        </DialogActions>
        </BootstrapDialog>
    </div>
    );
}
