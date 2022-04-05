import "antd/dist/antd.css";
import { useEffect, useState } from "react";
import { notification, Spin, Layout } from "antd";
import { getProfilesData } from "../../components/Swipecards/network/index";
import SideBar from "../../components/Swipecards/components2/Sidebar";

import {
  debounce,
  getLocalViewedProfiles,
  setLocalViewedProfiles,
} from "../../components/Swipecards/utilities";
import ProfileCards from "../../components/Swipecards/components2/profile-cards";

import fire from 'firebase/app'
import 'firebase/firestore';

import GroupsBanner from "../../components/Dashboard/Groups/GroupsBanner";
import IndividualGroup from "../../components/Dashboard/Groups/IndividualGroup";
import { useRouter } from 'next/router'
const { Footer, Content } = Layout;
import 'firebase/firestore';

import { makeStyles } from '@mui/styles';
import GroupsCard from '../../components/Dashboard/Groups/GroupsCard';


import { Grid, Container, Typography } from '@mui/material';


const buttonTitle = "See members";


const REMAINING_PROFILES_THRESHOLD = 2;

function App() {
    
const { asPath } = useRouter();
    // this reads the path where we take the groupname
  const url = asPath.split('/')
  const groupID = url[url.length - 1].split('%20').join(' ')
  const [profiles, setProfiles] = useState([]);
  const [viewedProfiles, setViewedProfiles] = useState([]);
  const [viewSelected, setViewSelected] = useState([]);
  const favi = []

  useEffect(() => {
    (async function getData() {
     // setViewedProfiles(getLocalViewedProfiles());
      const fetchedProfiles = await getProfilesData();
      setProfiles([...fetchedProfiles]);
    })();
  }, []);

  // will use this function later
    const getUserInfo = async () => {
      let currentUserUID = fire.auth().currentUser.uid
      
      let doc = await fire
      .firestore()
      .collection('userFavs')
      .doc(currentUserUID)
      .get()
  
      // deals with fetching the data
      if (!doc.exists){
          console.log('no profile saved in the database. Edit profile now')
      } else {
          let dataObj = doc.data();
          // have to work on this part fetching from databse
          setFavs(dataObj.viewSelected)
        
      }
  }
  const debouncedSwipe = debounce(function handleSwipe(type) {
    const [head, ...tail] = profiles;

    processCurrentCardAction();
    moveToNextCard();

    async function  processCurrentCardAction() {
      const updatedViewedProfiles = [
        ...viewedProfiles,
        { ...head, liked: type === "like" },
      ];

      // adds all the data that the user liked to firebase
      const likedData = viewedProfiles.filter(({ liked }) =>
      viewSelected === "favorites" ? liked: liked
   
    );
    
    
      setViewedProfiles(updatedViewedProfiles);
      setLocalViewedProfiles(updatedViewedProfiles);

      let currentUserUID = fire.auth().currentUser.uid
  
      const db = fire.firestore();
   
      const doc = await fire
      .firestore()
      .collection('userFavs')
      .doc(currentUserUID)
      .get()
      ///firefunctions.addfavs
       
      // this is the working section
        db.collection("groupFavs")
        .doc(groupID).collection("UserFavs").doc(currentUserUID)
         .set({
           favs: likedData
         })

//          let route = await firebase.firestore()
// .collection('route')
// .doc('0bayKbCiAchc0Vy9XuxT')
// .collection('qa')
// .get()

        // db.collection("groupFavs/"+groupID+ "/"+currentUserUID).add({favs: likedData}) 
    }

    // const db = fire.firestore();
    //       let currentUserUID = fire.auth().currentUser.uid
    //       const doc = await fire
    //                   .firestore()
    //                   .collection("userCalendar")
    //                   .doc(currentUserUID)
    //                   .get()
                    
    //                   // might change to the below code, not sure yet
    //                   //  db.collection("userCalendar")
    //                   //  .doc(currentUserUID)
    //                   //  .update({
    //                   //   activites: fire.firestore.FieldValue.arrayUnion(
    //                   //     {
    //                   //         allEvents
    //                   //     })
    //                   //  }
    //                   // )

    //                   db.collection("userCal/"+currentUserUID+"/activities").add({event}) // add event object to activites doc
                                         

    function moveToNextCard() {
      const isTimeToPrefetchData = tail.length <= REMAINING_PROFILES_THRESHOLD;
      const isLoading = !tail.length;
      if (isTimeToPrefetchData) {
        notification.success({
          message: "Prefetch 5 more cards",
          duration: 1,
        });
        (async function getData() {
          const fetchedProfiles = await getProfilesData();
          setProfiles([...tail, ...fetchedProfiles]);
        })();
      } else {
        setProfiles([...tail]);
      }
      if (isLoading) {
        notification.warning({
          message: "Oops! Seems like the internet connection is slow",
          duration: 1,
        });
      }
    }
  }, 300);

  return (
    <Layout style={{ minHeight: "100vh" }}>

<SideBar
        viewSelected={viewSelected}
        selectView={setViewSelected}
        viewedProfiles={viewedProfiles}
      />
         
     
      <Layout>
        <Content
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin spinning={!profiles.length}>
            <ProfileCards profiles={profiles} handleSwipe={debouncedSwipe} />
          </Spin>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;


// just adding this here for when Joanna fixes the code for picking which page to go to
