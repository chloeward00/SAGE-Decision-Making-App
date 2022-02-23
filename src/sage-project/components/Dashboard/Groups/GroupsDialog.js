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
import { TextField, Typography} from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    textField: {
        margin: '10px auto'
    }
}))

const CreateGroupDialog = ({ buttonTitle }) => {
    
    const classes = useStyles();

    const {} = props;
    
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    // FIREBASE ADD HERE when user click save, the new group should be added into firebase and shown in the page
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [groupName, setGroupName] = React.useState('');
    const [groupDescription, setgroupDescription] = React.useState('');


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
            <DialogTitle id="responsive-dialog-title">
                {buttonTitle}
            </DialogTitle>
            <DialogContent>
                {/* Name of the group, group description, what else?*/}
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
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="group-description"
                    label="Group Description"
                    fullWidth
                    variant="standard"
                    className={classes.textField}
                />
            </DialogContent>
            <DialogActions>
                {/* change the colour buttons to indicate which is save and cancel */}
                <Button autoFocus onClick={handleClose}>
                    {"Cancel"}
                </Button>
                <Button onClick={handleClose} autoFocus>
                    {"Save"}
                </Button>
            </DialogActions>
            </Dialog>
        </div>
    );
}

export default CreateGroupDialog;