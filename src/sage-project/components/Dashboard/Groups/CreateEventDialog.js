
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

const CreateEventDialog = ({ groupID }) => {

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
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                {"Pick a category"}
            </BootstrapDialogTitle>
            <DialogContent>
                <DialogContentText>
                {"Start creating an event and choose one of the categories below."}
                </DialogContentText>
                <CategoriesCards groupID={groupID}/>
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

export default CreateEventDialog;