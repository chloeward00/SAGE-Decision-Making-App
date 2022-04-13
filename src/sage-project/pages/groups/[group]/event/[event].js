
import Groups from "../../../../components/Dashboard/Groups/GroupsList";
import GroupsBanner from "../../../../components/Dashboard/Groups/GroupsBanner";
import Layout from "../../../../components/Layout/Layout";
import PageLayout from "../../../../components/Layout/PageLayout";
import IndividualEventCard  from "../../../../components/Dashboard/Events/IndividualEventCard"
import { useState, useEffect } from 'react';
import fire from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth'
import { useRouter } from "next/router";
import IndividualEvent from "../../../../components/Dashboard/Events/IndividualEvent";
import EventsBanner from "../../../../components/Dashboard/Events/EventsBanner";


// const groupName = "Groups";
// const buttonTitle = "Create a new group";
// const groupID = "";

const EventPage = () => {

    const router = useRouter();

    const url = router.asPath.split('/')
    const urlCategory = url[2]
  
    const groupID = router.query.group
    const eventID = router.query.event

    const likes = [];

    //console.log("THIS IS THE GROUP ID  " + groupID)
    //console.log("THIS IS THE EVENT ID  " + eventID)

    const [eventName, setEventName] = useState('')
    const [groupLikes, setLikes] = useState([])
    const [likeCount, setCount] = useState([]);
    const [highestLikeName, setHighestLikeName] = useState();
    const [topLikedDataInformation, setTopLikeDataInformation] = useState([]);
    

   // alert(likes)
    useEffect(() => {
    // isMounted is added to prevent memory leaks

        let isMounted = true;

        async function fetchData() {
                                                                                                                           
            await fire.firestore()
            .collection("groupsCategory")
            .doc(groupID)
            .collection('events')
            .doc(eventID)
            .onSnapshot((querySnapshot) => {
                if(isMounted){
                    //console.log("print indi event heree  " + querySnapshot.data().eventID)
                  
                    setEventName(querySnapshot.data().eventName)
                    // setIndividualEventDetails(querySnapshot.data())
                }
                // console.log("print indi event heree  " + querySnapshot.data().eventID)
                // setEventName(querySnapshot.data().eventName)
            });
        }

        fetchData(); 
       

        return () => {
            isMounted = false
        }
 
    }, []); 

  
    const matchLikes = async () => {
        const snapshot = await fire.firestore()
        .collection("eventLikes")
        .doc(eventID).get()

    }

    // this gets all the likes into a single list
     const fetchMatches = async () => {
        const snapshot = await fire.firestore()
        .collection("groupsCategory")
        .doc(groupID)
        .collection('events')
        .doc(eventID)
        .collection("memberPicks").get()
        
       
        const data = snapshot.docs.map(doc => doc.data().userLikes)
        const likes = data.flat();

      
        const db = fire.firestore();
        db.collection("eventLikes")
        .doc(eventID)
        .set({
          ActivityLikes: likes
        })
    }
        
      
               useEffect(() => {
                 let mounted = false
        
                 if(!mounted){
                     fetchMatches();
                     getUserInfo();
                     topLikedData();
                     getLikedInfo();
                 }
                
                 return () => {
                     mounted = true
                 }
            
            }, [])

    const topLikedData = async () => {
    
                                  
        
        
        await fire.firestore()
        .collection("eventLikes")
        .doc(eventID)
        .onSnapshot((querySnapshot) => {
            const likedData = querySnapshot.data().ActivityLikes.find(d => d.name === highestLikeName)
            setTopLikeDataInformation(likedData)
            
          // setTopLikeDataInformation(likedData)

        })
        //setTopLikeDataInformation(likedData)
        
            }

            const getLikedInfo = async () => {
                let currentUserUID = fire.auth().currentUser.uid
                 
                
                let doc = await fire
                .firestore()
                .collection('eventLikes')
                .doc(eventID)
                .collection("topPicks")
                .doc(eventID)
                .get()
             
                const dataObj = doc.data();

                if (!doc.exists){
                    console.log('no profile saved in the database. Edit profile now')
                } else {
                    setHighestLikeName(dataObj.topLikes) 
                  
              
                }
               
                
            }

                 
  const getUserInfo = async () => {
    
  
    fire.firestore()
    .collection("eventLikes")
    .doc(eventID).onSnapshot((docSnapshot) => {
      const nameCounts = docSnapshot.data().ActivityLikes.reduce((acc, cur) => {
        acc[cur.name] = (acc[cur.name] || 0) + 1;
        return acc;
      }, {});


      // counting how many time each activity appears in the list and adding it to a hook
      setCount(nameCounts);

      let max = 0;
      let maxKey = "";
    
      
      for(let char in  likeCount){
        if( likeCount[char]> max){
            max =  likeCount[char];
            maxKey = char
        }
    }
        
 
       fire.firestore().collection("eventLikes")
      .doc(eventID)
      .collection("topPicks")
      .doc(eventID)
      .set({topLikes: maxKey,
            nameCounts: likeCount,
            solution: topLikedDataInformation
        })

      console.log(nameCounts,"ruprup")
    
    //   if (!doc.exists){
    //     console.log('no profile saved in the database. Edit profile now')
    // } else {
       
 
   //}
    })
     
        
  



  
  }
  


    return (
        <div>
            <PageLayout>
                <EventsBanner eventName={eventName} groupID={groupID}/>
                <h1>PUT THE EVENT DATA HERE AND LET THE MEMBERS DO THE SURVEY AND LET THE ADMIN EDIT STUFF</h1>
                {/* <h1>LETS FIX THISS EVENT PAGE</h1> */}
                <IndividualEvent eventID={eventID} groupID={groupID}/>
            </PageLayout>
        </div>
    );
}

export default EventPage;
