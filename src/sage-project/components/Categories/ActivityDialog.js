import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme, makeStyles } from '@mui/styles';
import { Chip, ListItem, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import fire from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth';

var allActiveCategories = require('../../../sage-api/yelp/allJSONData/allActiveCategories.json');
var allChillCategories = require('../../../sage-api/yelp/allJSONData/allChillCategories.json');
var allSportsCategories = require('../../../sage-api/yelp/allJSONData/allSportsCategories.json');

const useStyles = makeStyles((theme) => ({
    chip: {
        padding: theme.spacing(),
        width: '75%',
    },
    multiCol: {
        float: 'left',
        width: '50%', 
    },
    buttonDialog: {
        '& .MuiButton-root': {
            width: theme.spacing(3)
        }
    }
}))

const ActiveDialog = ({ name, path }) => {

    const classes = useStyles();    
    const theme = useTheme();
    const router = useRouter();

    const url = router.asPath.split('/')    
    // categories/activity/GNT8S40KnF3OQIU1rcpX&lat=-6.260404586791993&long=53.34260431162625
    // GNT8S40KnF3OQIU1rcpX&lat=-6.260404586791993&long=53.34260431162625 this is the router.query.activities -- so we need to get the first one only which is the ID
    const urlCategory = url[2]
    const params = url[3].split('&')
    const latitude = params[1].split('=')[1]
    const longitude = params[2].split('=')[1]
  
    const groupID = params[0]
    const groupAdmin = fire.auth().currentUser.uid

    console.log('group IDD   ' + groupID)

    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState(false);
    const [chipsSelected, setChipsSelected] = useState([])

    const handleAddChip = (cat) => {
        if(!chipsSelected.includes(cat)){
            setChipsSelected(chipsSelected => [...chipsSelected, cat])
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleSubmit = (eventID) => {
        // router.push('/categories/activity/options/' + groupID + "&" + eventID + "&" + chipsSelected)
        router.push('/categories/activity/options/' + groupID + "&" + eventID + "&" + chipsSelected + "&lat=" + latitude + "&long=" + longitude)
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleUndo = () => {
        setChipsSelected([])
    }

    const adminCategoryPick = () => {
        
        const docRef = fire.firestore()
        .collection('groupsCategory')
        .doc(groupID)
        .collection('events')
        .doc()

        docRef.set({
            groupEvent: '',             // this is the result after the matching -- name of the event
            eventImage: '',             // this will be pulled from the matching result
            eventCategory: urlCategory,
            eventDate: '',
            eventTime: '',
            eventLocation: '',
            eventName: docRef.id,    // this can be edited by the Admin only
            eventID: docRef.id,
            chosenLocation: '',          // this is for getting the location users want to check (TBD by Chloe)
            adminPicks: chipsSelected,
            eventAdmin: groupAdmin,
            createdAt: new Date(),
            calendarDate: '',
            groupID: groupID
        })
        .catch((err) => {
            alert(err)
            console.log(err)
        })

        handleSubmit(docRef.id)

    }

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen} size="large" sx={{ minWidth: theme.spacing(24)}}>
                {name}
            </Button>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
            <DialogTitle id="responsive-dialog-title">
                {name == 'active' ? "Active" : name == 'chill' ? "Chill" : "Sports"}
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={1}>
                {name == 'active' ? 
                    allActiveCategories.map((data) => {
                        return (
                            <Grid item className={classes.multiCol}>
                                <Chip
                                    variant="outline"
                                    color={chipsSelected.includes(data.alias) ? "success" : "default"}
                                    label={data.title}
                                    onClick={() => {
                                        handleAddChip(data.alias)
                                    }}
                                    className={classes.chip}
                                />
                            </Grid>
                        )
                    })
                :   name == 'chill' ?
                    allChillCategories.map((data) => {
                        return (
                            <Grid item className={classes.multiCol}>
                                <Chip
                                    variant="outline"
                                    color={chipsSelected.includes(data.alias) ? "success" : "default"}
                                    label={data.title}
                                    onClick={() => {
                                        handleAddChip(data.alias)
                                    }}
                                    className={classes.chip}
                                />
                            </Grid>
                        )
                    })
                :   allSportsCategories.map((data) => {
                        return (
                            <Grid item className={classes.multiCol}>
                                <Chip
                                    variant="outline"
                                    color={chipsSelected.includes(data.alias) ? "success" : "default"}
                                    label={data.title}
                                    onClick={() => {
                                        handleAddChip(data.alias)
                                    }}
                                    className={classes.chip}
                                />
                            </Grid>
                        )
                    })}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleUndo}>
                    {"Undo"}
                </Button>
                <Button onClick={ () => {
                    adminCategoryPick()
                }} autoFocus>
                    {"Proceed"}
                </Button>
            </DialogActions>
            </Dialog>
        </div>
    );
}

export default ActiveDialog;
