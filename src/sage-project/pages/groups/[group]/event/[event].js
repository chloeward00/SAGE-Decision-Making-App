
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
    const [topLikedDataInformation, setTopLikeDataInformation] = useState();
    

    const pickHighest = (obj, num = 1) => {
        const requiredObj = {};
        if(num > Object.keys(obj).length){
           return false;
        };
        Object.keys(obj).sort((a, b) => obj[b] - obj[a]).forEach((key, ind) =>
        {
           if(ind < num){
              requiredObj[key] = obj[key];
           }
        });
        return requiredObj;
     };


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
        getUserInfo();
       

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
                     topLikedData();
                     getLikedInfo();
                    // getUserInfo();
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

          
            })
            
        //setTopLikeDataInformation(likedData)
      

     
        }

         
    const getLikedInfo = async () => {
            
            
                const doc =  fire
                .firestore()
                .collection('eventLikes')
                .doc(eventID)
                .collection("topPicks")
                .doc(eventID)
                .get()
             
               

                if (!doc.exists){
                    console.log('no profile saved in the database. Edit profile now')
                } else {
                     const dataObj = doc.data();
                    setHighestLikeName(dataObj.maxVal) 
                    
                  
              
                }
                  
            }

                 
  const getUserInfo = async () => {
    

    // this makes a dictionary of like costa:5 , mcdonalds: 2
  
    fire.firestore()
    .collection("eventLikes")
    .doc(eventID).onSnapshot((docSnapshot) => {
      const nameCounts = docSnapshot.data().ActivityLikes.reduce((acc, cur) => {
        acc[cur.name] = (acc[cur.name] || 0) + 1;
        return acc;
      }, {});


      // counting how many time each activity appears in the list and adding it to a hook
      setCount(nameCounts);

      const max = 0;
      const maxVari = "";
    
      // to get the the number 1 liked activity
      for(let char in  nameCounts){
        if( nameCounts[char]> max){
            max =  nameCounts[char];
            maxVari = char
        }
    }


      //const maxVari = Object.keys(likeCount).reduce((a, b) => likeCount[a] > likeCount[b] ? a : b);


        fire.firestore()
        .collection("eventLikes")
        .doc(eventID)
        .onSnapshot((querySnapshot) => {
        const likedData = querySnapshot.data().ActivityLikes.find(d => d.name === maxVari)
        setTopLikeDataInformation(likedData)
        console.log(likedData , "yahyah")
        fire.firestore().collection("groupSolution")
        .doc(eventID)
        .set({
              solution:  likedData
          
            })      
          
            })
        
         

       
     
        
 
      fire.firestore().collection("eventLikes")
      .doc(eventID)
      .collection("topPicks")
      .doc(eventID)
      .set({
            nameCount: nameCounts,
            maxVal: maxVari
        })

      console.log(likeCount,"ruprup")
      const names = Object.keys(pickHighest(likeCount, 2))

    

      // this section is for the top 5, but right now I am just asking for 2 in the pickHighest function
      const topDataList = []
      
      for (let i = 0; i < names.length; i++) {
        fire.firestore()
        .collection("eventLikes")
        .doc(eventID)
        .onSnapshot((querySnapshot) => {
         topDataList.push(querySnapshot.data().ActivityLikes.find(d => d.name === names[i]))
       
        fire.firestore().collection("topFiveGroupSolution")
        .doc(eventID)
        .set({
              solution:   topDataList
          
            })      
          
            })
       
      }


    
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
