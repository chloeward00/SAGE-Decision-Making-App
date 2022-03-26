import GroupsBanner from "../../components/Dashboard/Groups/GroupsBanner";
import Layout from "../../components/Layout/Layout";
import IndividualGroup from "../../components/Dashboard/Groups/IndividualGroup";
import { useRouter } from 'next/router'
import { useState, useEffect } from "react";
import fire from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore';
import Avatar from "@material-ui/core/Avatar";

const buttonTitle = "See members";

const Group = () => {
    const router = useRouter();
    console.log("MEHHHHH   " + router.query.group)

    const { asPath } = useRouter();
    // this reads the path where we take the groupname
    const url = asPath.split('/')
    const groupID = url[url.length - 1].split('%20').join(' ')

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

    console.log(comments + "looooooool")
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
            <Layout>
                <GroupsBanner groupName={name} buttonTitle={buttonTitle}/>
                <IndividualGroup/>

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
            Post
          </button>
        </form>


        <div className="post__comments">
        {comments.map((comment) => (
          <p>
            <strong>{comment.username} </strong>
            {comment.text}
          </p>
        ))}
      </div>
            </Layout> 
      
   </div>
        
    );
}

export default Group;

// wrap layout component
