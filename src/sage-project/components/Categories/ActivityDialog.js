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
import { useState } from 'react';
import { getYELPData } from '../../hooks/yelp-api/useCategoriesSearch';
import { useRouter } from 'next/router'



const getQueryParams = (categories) => {
    const query = categories.join();
    return query
}

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
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState(false);
    const [chipsSelected, setChipsSelected] = useState([])


    const handleAddChip = (cat) => {
        if(!chipsSelected.includes(cat)){
            setChipsSelected(chipsSelected => [...chipsSelected, cat])
        }
    };

    console.log(chipsSelected);

    // const returnedOptions =  getYELPData()
    // console.log("yelp data hook " + returnedOptions)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleSubmit = () => {
        getQueryParams(chipsSelected)
        router.push('/categories/activity/options')
        // return chipsSelected
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleUndo = () => {
        setChipsSelected([])
    }

    const activeCategories = [
        {
            // this needs to open more options
            name: "active",
            onClick: () => router.push('/home/calendar')
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
        
        {
            // this needs to open more options
            name: "sports",
            path: ""
        }, 
        
        {
            name: "zoos"
        }
    ]

    // const chillCategories = ['arts', 'beautysvc', 'movietheaters', 'museums', 'shopping', 'wineries']
    const chillCategories = [
        {
            name: "arts"
        },
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

                {/* <DialogContentText>
                Let Google help apps determine location. This means sending anonymous
                location data to Google, even when no apps are running.
                </DialogContentText> */}

            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleUndo}>
                Undo
                </Button>
                <Button onClick={handleSubmit} autoFocus>
                Proceed
                </Button>
            </DialogActions>
            </Dialog>
        </div>
    );
}

export default ActiveDialog;
