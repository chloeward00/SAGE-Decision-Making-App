
import { AppBar, Avatar, Toolbar, Typography, Button, ButtonBase, Container } from "@mui/material";
import { makeStyles } from '@mui/styles';
import fire from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth'
import { useRouter } from 'next/router'
import TodayIcon from '@mui/icons-material/Today';
import { useState, useEffect } from "react";


const getTime = () => {
    
    var today = new Date()
    var curHr = today.getHours()
    var greeting = ""

    if (curHr < 12) {
        greeting = "Good Morning,"
    } else if (curHr < 18) {
        greeting = "Good Afternoon,"
    } else {
        greeting = "Good Evening,"
    }

    return greeting
}

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
        // margin: 'auto'
    },
    banner: {
        display: 'flex', 
        justifyContent: 'space-between',
        marginRight: theme.spacing(3),
        marginLeft: theme.spacing(3)
    },
    date: {
        borderStyle: "solid",
        borderWidth: 1,
        // borderColor: ,
        borderColor: theme.colours.lightBlue,
        borderRadius: 15,
        padding: "7px 15px 7px 15px",
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    },
    welcomeText: {
        display: 'flex',
    },
    userName: {
        paddingLeft: 5,
        fontWeight: 500,
        // color: theme.text.purple
        color: 'rgba(134,168,231,1)'
    },
    dateText: {
        marginLeft: 10,
        color: theme.colours.lightBlue
    },
    dateIcon: {
        color: '#555555',
        color: theme.colours.lightBlue
    },
    lowerText: {
        color: theme.text.darkGray,
        marginLeft: theme.spacing(3)
    }
}))

const Banner = () => {

    const classes = useStyles();

    const router = useRouter();
    
    const userID = fire.auth().currentUser.uid;

    const [userName, setUserName] = useState('')

    var today = new Date()

    var date = today.toDateString()

    useEffect(() => {
        async function fetchData() {

            //  calling firebase like this does not lag when updated
            await fire.firestore().collection('users').doc(userID)
            .get()
            .then((querySnapshot) => {
                setUserName(querySnapshot.data().userName)
                // console.log("hereeee " + querySnapshot.data().userName)
            })  
            .catch((error) => {
                // console.log("Error getting documents: ", error);
            });
        }
        fetchData()
    });

    return (
        <Container className={classes.root}>
            <div className={classes.banner}>
                <div className={classes.welcomeText}>
                    <Typography variant="h5">
                        {getTime()}
                    </Typography>
                    <Typography variant="h5" className={classes.userName}>
                        {userName + "!"}
                    </Typography>
                </div>

                <ButtonBase onClick={ () => router.push('/home/calendar')}>
                    <div className={classes.date}>
                        <TodayIcon className={classes.dateIcon}/>
                        <Typography className={classes.dateText}>
                            {date}
                        </Typography>
                    </div>
                </ButtonBase>
            
            </div>
            <Typography className={classes.lowerText}>
                {"Here are your upcoming events"}
            </Typography>   
        </Container>
    );
}
 
export default Banner;