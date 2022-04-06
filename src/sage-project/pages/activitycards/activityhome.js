import "antd/dist/antd.css";
import { useEffect, useState } from "react";
import { notification, Spin, Layout } from "antd";
import { getProfilesData } from "../../components/SwipeActivity/network/index";
import SideBar from "../../components/SwipeActivity/components2/Sidebar";

import {
  debounce,
  getLocalViewedProfiles,
  setLocalViewedProfiles,
} from "../../components/SwipeActivity/utilities";
import ProfileCards from "../../components/SwipeActivity/components2/profile-cards";

import fire from 'firebase/app'
import 'firebase/firestore';

import getYELPData from "../../hooks/yelp-api/useCategoriesSearch";

const { Footer, Content } = Layout;
const REMAINING_PROFILES_THRESHOLD = 2;


function App() {
  const [profiles, setProfiles] = useState([]);
  const [viewedProfiles, setViewedProfiles] = useState([]);
  const [viewSelected, setViewSelected] = useState([]);
  const favi = []

 

  useEffect(() => {
    (async function getData() {
      setViewedProfiles(getLocalViewedProfiles());
      const fetchedProfiles = await getProfilesData();
      setProfiles([...profiles, ...fetchedProfiles]);
    })();
  }, []);

  // will use this function later
    const getUserInfo = async () => {
      let currentUserUID = fire.auth().currentUser.uid
      
      let doc = await fire
      .firestore()
      .collection('userActivityFavs')
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
      .collection('userActivityFavs')
      .doc(currentUserUID)
      .get()
      ///firefunctions.addfavs
       
      // this is the working section
        db.collection("userActivityFavs")
        .doc(currentUserUID)
        .set({
          favs: likedData
        })
    }

    function moveToNextCard() {
      const isTimeToPrefetchData = tail.length <= REMAINING_PROFILES_THRESHOLD;
      const isLoading = !tail.length;
      if (isTimeToPrefetchData) {
        notification.success({
          message: "Prefetch 5 more cards",
          duration: 1,
        });
        (async function getData() {
          const fetchedProfiles = await getYELPData();
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