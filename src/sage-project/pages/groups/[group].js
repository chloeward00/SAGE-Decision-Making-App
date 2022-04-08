import GroupsBanner from "../../components/Dashboard/Groups/GroupsBanner";
import Layout from "../../components/Layout/Layout";
import IndividualGroup from "../../components/Dashboard/Groups/IndividualGroup";
import { useRouter } from 'next/router'
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import fire from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore';
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from '@mui/styles';
import PageLayout from "../../components/Layout/PageLayout";


const buttonTitle = "See members";

const useStyles = makeStyles((theme) => ({

  avatar: {
      width: 20,
      height: 20,
      fontSize: 10,
      // change these colours
      // color: 'black',
      backgroundColor: theme.colours.pink,
      marginTop: 25,
      margin: 'auto',
       left: 80
      
  },
  avatarWhite: {
      width: 10,
      height: 20,
      borderRadius: 100 / 2,
      backgroundColor: 'white',
      margin: 'right',
      marginTop: 30,
  }
}))



const Group = () => {
    const classes = useStyles();
    const router = useRouter();
    const groupID = router.query.group
    
    console.log("MEHHHHH   " + router.query.group)

    // const { asPath } = useRouter();
    // this reads the path where we take the groupname
    // const url = asPath.split('/')
    // const groupID = url[url.length - 1].split('%20').join(' ')

    const [name, setName] = useState('');
    const [members, setMembers] = useState('');
    const [description, setDescription] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    
    // comment stuff

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");

    const username = fire.auth().currentUser.displayName;

    const getUserInfo = async () => {
        let currentUserUID = fire.auth().currentUser.uid
        
        let doc = await fire
        .firestore()
        .collection('groups')
        .doc(groupID)
        .get()
    
        if (!doc.exists){
            console.log('no group saved in the database')
        } else {
            let dataObj = doc.data();
            setName(dataObj.groupName)
            setMembers(dataObj.groupMembers)
            setDescription(dataObj.description)
            setCreatedAt(dataObj.createdAt)
        }
    }

    useEffect(() => {
    
        fire.firestore().collection("posts")
        .doc(groupID)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
            setComments(snapshot.docs.map((doc) => doc.data()));
        });
    
    
    }, []);

    const postComment = (event) => {
        event.preventDefault();
        fire.firestore().collection("posts").doc(groupID).collection("comments").add({
            text: comment,
            username:  fire.auth().currentUser.displayName,
            timestamp: new Date()
        });
        setComment("");
    };

        useEffect(() => {
          let mounted = false

          if(!mounted){
              getUserInfo()
          }
          
          return () => {
              mounted = true
          }

      }, [])

  

    return (
        <div>
            <PageLayout>
                <GroupsBanner groupName={name} buttonTitle={buttonTitle} groupID={groupID}/>
                <IndividualGroup/>
                {/* NEEDS DESIGN FOR THE COMMENTS */}
                <form className="post__commentBox">
                    <input
                        className="post__input"
                        type="text"
                        placeholder="Add a comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <button
                        className="post__button"
                        disabled={!comment}
                        type="submit"
                        onClick={postComment}
                    >
                        {"Post"}
                    </button>
                </form>

                <div className="post__comments">
                    {comments.map((comment) => (
                        <p>
                            <div>
                                <Avatar className={classes.avatar}>{comment.username.charAt(0).toLocaleUpperCase()}</Avatar>
                            </div>
                            <strong>{comment.username}</strong>
                            {comment.text}
                        </p>
                    ))}
                </div>  
            </PageLayout>    
        </div>
        
    );
}

export default Group;

// wrap layout component
