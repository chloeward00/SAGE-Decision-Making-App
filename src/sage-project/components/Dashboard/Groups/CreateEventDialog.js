
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
import CategoriesCards from '../../Categories/CategoriesPage';

const useStyles = makeStyles((theme) => ({
    textField: {
        margin: '10px auto'
    }
}))


const CreateEventDialog = () => {

    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen} startIcon={<AddCircleIcon />}>
                {"Create event"}
            </Button>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
            <DialogTitle id="responsive-dialog-title">
                {"Pick a category"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                {"Start creating an event and choose one of the categories below."}
                </DialogContentText>
                <CategoriesCards/>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose}>
                Close 
                </Button>
            </DialogActions>
            </Dialog>
        </div>
    );
}

export default CreateEventDialog;