import React from "react";
import { useState, useEffect } from 'react';
import fire from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth'
import { useRouter } from "next/router";
import { makeStyles, useTheme } from '@mui/styles';
import { Paper, TextField, Typography, Grid, Button, Container, List, ListItem, Divider, ListItemText, ListItemAvatar, Avatar, Box, InputAdornment } from '@mui/material';


const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        backgroundColor: '#F9FAFA'
    },
    fonts: {
        fontWeight: "bold"
    },
    inline: {
        display: "inline"
    },
    commentForm: {
        width: '100%'
    },
    avatar: {
        fontSize: 32,
        backgroundColor: theme.colours.pink,
    },
    page: {
        padding: '50px'
    }
}))

const Comments = () => {

    const classes = useStyles();
    const router = useRouter();
    const theme = useTheme();

    const groupID = router.query.group
    const eventID = router.query.event

    const userID = fire.auth().currentUser.uid;

    const [name, setName] = useState('');
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");

    useEffect(() => {
        async function fetchData() {

            //  calling firebase like this does not lag when updated
            await fire.firestore().collection('users').doc(userID)
            .get()
            .then((querySnapshot) => {
                setName(querySnapshot.data().userName)
                console.log("hereeee " + querySnapshot.data().userBio)
            })  
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
        }
        fetchData()
    });

    useEffect(() => {
    
        fire.firestore()
        .collection("posts")
        .doc(eventID)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
            setComments(snapshot.docs.map((doc) => doc.data()));
        });

    }, []);

    const postComment = () => {

        const docRef = fire.firestore()
        .collection("posts")
        .doc(eventID)
        .collection("comments")
        .doc()
        
        docRef.set({
            text: comment,
            userName: name,
            userID: userID,
            timestamp: new Date(),
            commentID: docRef
        })
        .catch((err) => {
            alert(err)
            console.log(err)
        })

        setComment("");
    };

    const userAvatarName = name.charAt(0).toLocaleUpperCase()

    return (  
        <Container className={classes.page}>
            <Typography 
                variant="h5"
                gutterBottom            
            >
                {"Comments"}
            </Typography>
            <Box
                sx={{
                    maxWidth: "100%",
                    marginBottom: theme.spacing(2),
                    // backgroundColor: theme.colours.blue
                }}
            >
                <TextField 
                    fullWidth 
                    id="fullWidth" 
                    value={comment}
                    placeholder="Add a comment.."
                    onChange={(e) => setComment(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                            <Button 
                                variant="text"
                                disableRipple="true"
                                disableFocusRipple="true"
                                onClick={postComment}
                            >
                                {"POST"}
                            </Button>
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>
            <List className={classes.root}>
                {comments.map(comment => {
                    console.log("Comment", comment);
                    return (
                        <React.Fragment key={comment.commentID}>
                            <ListItem key={comment.commentID} alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar className={classes.avatar}>{comment.userName.charAt(0).toLocaleUpperCase()}</Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <Typography className={classes.fonts}>
                                            {comment.userName}
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.inline}
                                            color="textPrimary"
                                        >
                                            {comment.text}
                                        </Typography>
                                    }
                                    />
                            </ListItem>
                            <Divider />
                        </React.Fragment>
                    );
                })}
            </List>
        </Container>

    );
}
 
export default Comments;