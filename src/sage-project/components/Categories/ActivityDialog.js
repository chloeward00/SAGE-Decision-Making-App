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


const useStyles = makeStyles((theme) => ({
    chipGrid: {
    },
    chip: {
        padding: theme.spacing(1),
    },
    multiCol: {
        float: 'left',
        width: '50%',
        
    },
}))

const ActiveDialog = ({ name, path }) => {

    const classes = useStyles();    
    const theme = useTheme();
    const router = useRouter();

    const url = router.asPath.split('/')
    const urlCategory = url[2]
  
    const groupID = router.query.activities

    console.log("url hereee " + urlCategory.toUpperCase())

    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState(false);
    const [chipsSelected, setChipsSelected] = useState([])
    const [eventKeyID, setEventKeyID] = useState("")

    const handleAddChip = (cat) => {
        if(!chipsSelected.includes(cat)){
            setChipsSelected(chipsSelected => [...chipsSelected, cat])
        }
    };

    console.log("PRINTING CHIPS SELECTED HEREEE " + chipsSelected);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleSubmit = (eventID) => {
        // router.push(`/categories/activity/options/group=${groupID}&event=${eventID}&categories=${chipsSelected}`)
        router.push('/categories/activity/options/' + groupID + "&" + eventID + "&" + chipsSelected)
        console.log("lets seeee if event id is here " + eventID)
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
            groupEvent: '',             // this is the result after the matching
            eventImage: '',             // this will be pulled from the matching result
            eventCategory: urlCategory,
            eventDate: '',
            eventDetails: {
                where: '',
                when: '',
                time: ''
            },
            eventName: 'add event name',    // this can be edited by the Admin only
            eventID: docRef.id,
            eventLocation: '',          // this is for getting the location users want to check (TBD by Chloe)
            adminPicks: chipsSelected,
            createdAt: new Date()
        })
        .catch((err) => {
            alert(err)
            console.log(err)
        })

        handleSubmit(docRef.id)

    }

    // here we want to write into this groupsCategory collection will all the stuff we need

    const activeCategories = [
        {
            // this needs to open more options
            name: "active",
            // onClick: () => router.push('/home/calendar')
        }, 
        
        {
            name: "festivals"
        }, 
        
        {
            name: "fitness"
        }, 
        
        {
            name: "nightlife"
        }, 
        
        // {
        //     // this needs to open more options
        //     name: "sports",
        //     path: ""
        // },
        {
            name: "zoos"
        }
    ]

    // const chillCategories = ['arts', 'beautysvc', 'movietheaters', 'museums', 'shopping', 'wineries']
    const chillCategories = [
        // {
        //     name: "arts"
        // },
        {
            name: "beautysvc"
        },
        {
            name: "movietheaters"
        },
        {
            name: "museums"
        },
        {
            name: "shopping"
        },
        {
            name: "wineries"
        }
    ]

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                {name}
            </Button>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
            <DialogTitle id="responsive-dialog-title">
                {name == 'active' ? "Active" : "Chill"}
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={1}>
                {name == 'active' ? 
                    activeCategories.map((data) => {
                        return (
                            <Grid item className={classes.multiCol}>
                                <Chip
                                    variant="outline"
                                    color={chipsSelected.includes(data.name) ? "success" : "default"}
                                    label={data.name}
                                    onClick={() => {
                                        handleAddChip(data.name)
                                    }}
                                    className={classes.chip}
                                />
                            </Grid>
                        )
                    })
                :   chillCategories.map((data) => {
                        return (
                            <Grid item className={classes.multiCol}>
                                <Chip
                                    variant="outline"
                                    color={chipsSelected.includes(data.name) ? "success" : "default"}
                                    label={data.name}
                                    onClick={() => {
                                        handleAddChip(data.name)
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
                Undo
                </Button>
                <Button onClick={ () => {
                    adminCategoryPick()
                    // handleSubmit()
                }} autoFocus>
                Proceed
                </Button>
            </DialogActions>
            </Dialog>
        </div>
    );
}

export default ActiveDialog;
