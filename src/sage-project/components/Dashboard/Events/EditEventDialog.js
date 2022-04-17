
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
import EventDatePicker from './EventDatePicker';
import Stack from '@mui/material/Stack';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import fire from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth'


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

const EditEventDialog = ({ groupID, eventID, eventDetails }) => {

    const { eventName, eventTime, eventDate } = eventDetails;

    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [maxWidth, setMaxWidth] = React.useState('md');

    const [selectedDate, setSelectedDate] = useState(eventDate)
    const [selectedTime, setSelectedTime] = useState(eventTime)
    const [updatedEventName, setUpdatedEventName] = useState(eventName)

    console.log({ selectedDate: selectedDate && selectedDate.toLocaleDateString() })
    console.log({ selectedTime: selectedTime && selectedTime.toLocaleTimeString() })

    console.log('ev deeetss  ' + eventDate)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const updateEvent = () => {

        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

        fire.firestore()
        .collection('groupsCategory')
        .doc(groupID)
        .collection('events')
        .doc(eventID)
        .update({
            eventName: updatedEventName,
            eventDate: selectedDate && selectedDate.toLocaleDateString(undefined, options),
            eventTime: selectedTime && selectedTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            calendarDate: selectedDate
        })  
        .catch((err) => {
            alert(err)
            console.log(err)
        })
    }

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen} startIcon={<AddCircleIcon />}>
                {"EDIT EVENT"}
            </Button>
            <Dialog
                fullScreen={fullScreen}
                fullWidth={true}
                maxWidth={'xs'}
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
                {/* <EventDatePicker/> */}
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Stack spacing={3}>
                        <TextField
                            autoFocus
                            margin="dense"
                            defaultValue={eventName}
                            id="group-name"
                            label="Event Name"
                            type="email"
                            fullWidth
                            variant="standard"
                            onChange={(e) => setUpdatedEventName(e.target.value)}
                        />
                        <DatePicker
                            label="Event Date"
                            value={selectedDate}
                            onChange={(newValue) => {
                                setSelectedDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <TimePicker
                            label="Event Time"
                            value={selectedTime}
                            onChange={(newValue) => {
                                setSelectedTime(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Stack>
                </LocalizationProvider>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={ () => {
                    updateEvent()
                    handleClose()
                }}>
                {"Submit"} 
                </Button>
            </DialogActions>
            </Dialog>
        </div>
    );
}

export default EditEventDialog;