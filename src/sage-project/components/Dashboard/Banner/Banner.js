
import { AppBar, Avatar, Toolbar, Typography, Button, ButtonBase, Container } from "@mui/material";
import { makeStyles } from '@mui/styles';
import 'firebase/auth';
import fire from 'firebase/app'
import { useRouter } from 'next/router'
import TodayIcon from '@mui/icons-material/Today';

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
    },
    banner: {
        display: 'flex', 
        justifyContent: 'space-between',
        marginRight: theme.spacing(3)
    },
    date: {
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: '#C0C0C0',
        // borderColor: theme.colours.rose,
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
        color: theme.text.purple
    },
    dateText: {
        marginLeft: 10,
        // color: theme.colours.rose
        color: '#555555'
    },
    dateIcon: {
        color: '#555555',
        // color: theme.colours.rose
    },
    lowerText: {
        // color: '#555555',
        // color: theme.text.gray
        color: theme.text.darkGray

    }
}))

const Banner = () => {

    const classes = useStyles();

    const router = useRouter();
    
    const currentUserName = fire.auth().currentUser.displayName;

    // const getUserFirstLetterName = currentUserName.charAt(0).toLocaleUpperCase()

    var today = new Date()

    var date = today.toDateString()

    return (
        <Container className={classes.root}>
            <div className={classes.banner}>
                <div className={classes.welcomeText}>
                    <Typography variant="h5">
                        {getTime()}
                    </Typography>
                    <Typography variant="h5" className={classes.userName}>
                        {currentUserName + "!"}
                    </Typography>
                </div>

                <ButtonBase>
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