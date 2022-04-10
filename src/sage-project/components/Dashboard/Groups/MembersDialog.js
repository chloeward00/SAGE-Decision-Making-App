import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import InviteDialog from './InviteDialog';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import 'firebase/firestore';
import fire from 'firebase/app'
import { useRouter } from 'next/router'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { makeStyles } from '@mui/styles';



// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//     '& .MuiDialogContent-root': {
//         padding: theme.spacing(2),
//     },s
//     '& .MuiDialogActions-root': {
//         padding: theme.spacing(1),
//     },
// }));

const gradient10 = 'rgba(127,127,213,0.5)' //#7F7FD5
const gradient11 = 'rgba(134,168,231,1)' // #86A8E7

const useStyles = makeStyles((theme) => ({
    dialogCont: {
        padding: '50px',
    },
    membersList: {
        marginTop: theme.spacing(-2),
        marginBottom: theme.spacing(4)
    },
    avatarBgColor: {
        backgroundImage: `linear-gradient(${gradient11}, ${gradient10})`,
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


const CustomizedDialogs = ({ buttonTitle, groupName }) => {

    const router = useRouter();
    const theme = useTheme();
    const classes = useStyles();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // this will be used for querying
    const groupID = router.query.group

    const [groupsList, setGroupList] = useState([]);
    const [userNames, setUserNames] = useState([]);

    useEffect(() => {

        let isMounted = true;

        async function fetchData() {

            await fire.firestore().collection('groups').where("groupID", "==", groupID)
            .onSnapshot(snapshot => {
                if(isMounted){
                    setGroupList(snapshot.docs.map(doc => doc.data().groupMembers))
                }
            })
        }

        fetchData();

        return () => { 
            isMounted = false
        }

    }, []);

    const getNames = async () => { 
        // the array members is added to the array as an array so we have to do it like this
        const loopArray = groupsList[0]
   
        for(let i = 0; i < loopArray.length; i++) {

            await fire.firestore().collection('users').where("userUID", "==", loopArray[i])
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if(!userNames.includes(doc.data().userName)){
                        setUserNames( arr => [...arr, doc.data().userName])
                    }
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
        }
    }

    console.log("usernamessss    " + userNames)
    console.log("groupslist   " + groupsList) 
    
    return (
        <div>
            <Container>
                <Button variant="outlined" onClick={ () => {
                            handleClickOpen()
                            getNames()
                    }}>
                    {buttonTitle}
                </Button>
                <Dialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                    fullScreen={fullScreen}
                >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {"Members"}
                </BootstrapDialogTitle>
                <DialogContent dividers className={classes.dialogCont}>
                    {userNames.length == 0 ? 
                        <Typography gutterBottom align="center" sx={{ marginBottom: '20px'}}>
                            {"No current members"}
                        </Typography>
                    :
                        <List className={classes.membersList}>
                            {userNames.map((members) => {
                            return (
                                <ListItem>
                                    <ListItemAvatar>
                                    <Avatar className={classes.avatarBgColor}>
                                        {members.charAt(0).toLocaleUpperCase()}
                                    </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={members} />
                                </ListItem>
                            )})}
                        </List>
                    }
                    {/* this is the add member button under individual groups - SEE MEMBERS Button atm */}
                    <InviteDialog groupName={groupName}/>
                </DialogContent>
                {/* <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                    Save changes
                    </Button>
                </DialogActions> */}
                </Dialog>
            </Container>
        </div>
    );
}

export default CustomizedDialogs;