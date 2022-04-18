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

const useStyles = makeStyles((theme) => ({
    chip: {
        padding: theme.spacing(),
        width: '75%',    },
    multiCol: {
        float: 'left',
        width: '50%',
    },
}))

const MovieDialog = ({ name, alias }) => {

    const classes = useStyles();
    const theme = useTheme();
    const router = useRouter();

    const url = router.asPath.split('/')
    const urlCategory = url[2]
  
    const groupID = router.query.movies
    const groupAdmin = fire.auth().currentUser.uid

    // console.log("url hereee " + urlCategory.toUpperCase())

    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [open, setOpen] = useState(false)
    const [selectedType, setSelectedType] = useState('');
    const [chipsSelected, setChipsSelected] = useState([])
    const [groupList, setGroupList] = useState([])

    const handleAddChip = (cat) => {
        if(!chipsSelected.includes(cat)){
            setChipsSelected(chipsSelected => [...chipsSelected, cat])
        }
    };

    const handleMovieType = (type) => {
        setSelectedType(type)
    };

    console.log('moviee typee heree  ' + selectedType)

    console.log("PRINTING CHIPS SELECTED HEREEE " + chipsSelected);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleSubmit = (eventID) => {
        router.push('/categories/movie/options/' + groupID + "&" + eventID +  "&" + selectedType + "&" + chipsSelected)
        // console.log("lets seeee if event id is here " + eventID)
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
            groupID: groupID,
            movieType: selectedType

        })
        .catch((err) => {
            alert(err)
            console.log(err)
        })

        updateUserEvents(docRef.id)
        handleSubmit(docRef.id)

    }
    
    const getGroupsList = () => {
        
        fire.firestore()
        .collection('groups')
        .doc(groupID)
        .onSnapshot(snapshot => {
            setGroupList(snapshot.data().groupMembers.map(member => member))
        })
    }

    const updateUserEvents = (eventID) => {

        for (const member of groupList){
            fire.firestore()
            .collection('users')
            .doc(member)
            .update({
                userEvents: fire.firestore.FieldValue.arrayUnion(eventID)
            })
            .catch((err) => {
                alert(err)
                console.log(err)
            })
        }
    }

    useEffect(() => {
        
        let mounted = false

        if(!mounted){
            getGroupsList()
        }
        
        return () => {
            mounted = true
        }

    },[])

    var allGenresList = require('../../../sage-api/tmbd/allGenresList.json');
    const genresList = allGenresList.genres

    console.log('checking grouplist here  ', groupList)
    

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
                {"Genres"}
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={1}>
                {genresList.map((data) => {
                        return (
                            <Grid item className={classes.multiCol}>
                                <Chip
                                    variant="outline"
                                    color={chipsSelected.includes(data.id) ? "success" : "default"}
                                    label={data.name}
                                    onClick={() => {
                                        handleAddChip(data.id)
                                        handleMovieType(alias)
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

export default MovieDialog;
