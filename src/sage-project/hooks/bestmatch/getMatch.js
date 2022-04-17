
import { useState, useEffect } from 'react';
import fire from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth'
import { useRouter } from "next/router";

export function getMatch() {

    const [eventName, setEventName] = useState('')
    const [individualEventData, setIndividualEventData] = useState([])
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
            fire.firestore().collection("groupTopMatch")
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
            
                fire.firestore().collection("groupTopFiveMatch")
                .doc(eventID)
                .set({
                    solution:   topDataList})
                    })
            }
        })
    }


    useEffect(() => {
        let mounted = false
        
        if(!mounted){
            fetchMatches();
            getLikedInfo();
            getUserInfo();
        }
                
        return () => {
            mounted = true
        }
    
    }, [])

}
 
// export default getMatch;