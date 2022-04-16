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
    const urlCategory = url[2]
    const params = url[3].split('&')
    const groupID = params[0]
    const eventID = params[1]

    console.log(eventID)

    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState(false);
    const [chipsSelected, setChipsSelected] = useState([])
    const [longitudeVal, setLongitudeVal] = useState('')
    const [latitudeVal, setLatitudeVal] = useState('')

    const handleAddChip = (cat) => {
        if(!chipsSelected.includes(cat)){
            setChipsSelected(chipsSelected => [...chipsSelected, cat])
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleSubmit = (latitudeVal, longitudeVal) => {
        // router.push('/categories/activity/options/' + groupID + "&" + eventID + "&" + chipsSelected)
        router.push('/categories/activity/options/' + groupID + "&" + eventID + '&' + chipsSelected + "&lat=" + latitudeVal + "&long=" + longitudeVal)
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleUndo = () => {
        setChipsSelected([])
    }

    useEffect(() => {
        let isMounted = true;
        async function fetchData() {

            await fire.firestore()
            .collection("groupsCategory")
            .doc(groupID)
            .collection('events')
            .doc(eventID)
            .onSnapshot((querySnapshot) => {
                if(isMounted){
                    setLongitudeVal(querySnapshot.data().longitude)
                    setLatitudeVal(querySnapshot.data().latitude)
                }
            });
        }

        fetchData();
        return () => {
            isMounted = false
        }

    }, []);

    const adminCategoryPick = () => {
        
        fire.firestore()
        .collection('groupsCategory')
        .doc(groupID)
        .collection('events')
        .doc(eventID)
        .update({
            adminPicks: chipsSelected,
        })
        .catch((err) => {
            alert(err)
            console.log(err)
        })

        handleSubmit(latitudeVal, longitudeVal)
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
