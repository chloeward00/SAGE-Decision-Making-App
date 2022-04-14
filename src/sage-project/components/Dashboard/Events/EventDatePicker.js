import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Stack from '@mui/material/Stack';
import { useState, useEffect } from 'react';


export default function EventDatePicker() {

    const [selectedDate, setSelectedDate] = useState(null)
    const [selectedTime, setSelectedTime] = useState(null)


    console.log("selected datee heree  " + selectedDate)

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
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
    );
}