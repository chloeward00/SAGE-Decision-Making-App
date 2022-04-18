import "antd/dist/antd.css";
import { useEffect, useState } from "react";
import { notification, Spin, Layout, Alert } from "antd";
import { getProfilesData } from "../../../../components/SwipeMovie/network/index";
import SideBar from "../../../../components/SwipeMovie/Cards/Sidebar";
import { debounce, getLocalViewedProfiles, setLocalViewedProfiles } from "../../../../components/SwipeMovie/utilities";
// import ProfileCards from "../../../../components/SwipeMovie/Cards/profile-cards";
// import SwipeCards from '../../../../components/SwipeCard/Cards/SwipeCards'
import ProfileCards from "../../../../components/SwipeCard/Cards/SwipeCards";
import fire from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth'
import { useRouter } from "next/router";
import { getMovieData } from "../../../../hooks/tmbd-api/useGenreSearch";
import { Row, Button, Modal, Space, Typography } from "antd";
import { makeStyles } from '@mui/styles';


const { Footer, Content } = Layout;
const REMAINING_PROFILES_THRESHOLD = 2;

const useStyles = makeStyles( theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#A9B5DD', 
        minHeight: "100vh"
    },
}))

const SwipeMovie = () => {

    const router = useRouter()
    const classes = useStyles()

    const groupID = router.query.swipe.split('&')[0]
    const eventID = router.query.swipe.split('&')[1]
    const movieType = router.query.swipe.split('&')[2]
    const genres = router.query.swipe.split('&')[3]

    console.log("swipe page params here  " + groupID, eventID, movieType)
    console.log('categories admin picksss hereeeee  ' + movieType)
    console.log('theessee are the genres  ' + genres)

    const [profiles, setProfiles] = useState([]);
    const [viewedProfiles, setViewedProfiles] = useState([]);
    const [viewSelected, setViewSelected] = useState([]);

    useEffect(() => {
        (async function getData() {
            // setViewedProfiles(getLocalViewedProfiles());
            const fetchedProfiles = await getMovieData({movieType, genres});
             if(fetchedProfiles.length == 0){
                notification.error({
                    message: "No Data for this genre available!",
                    duration: 5,
                    
                })

                router.push(`/groups/${groupID}`)
                
            }
            setProfiles([...fetchedProfiles]);
        })();
    }, []);

    // if(profiles.length == 0){
    //     console.log('THERE ARE NO RESULTSSSS FOR THIS TYPE OF GENREEEE')
    // }

    console.log('lnegthh of resultsss    heree   ', profiles)

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
        
        // THIS WORKS - like data are saved into the collection - imgUrl, liked, name --> NEEDS TO GET REVIEWS, LOCATION, RATING, PHONE
        let currentUserUID = fire.auth().currentUser.uid
  
        const docRef = fire.firestore()
        .collection('groupsCategory')
        .doc(groupID)
        .collection('events')
        .doc(eventID)
        .collection('memberPicks')
        .doc(currentUserUID)

        docRef.set({
            userLikes: likedData
        })
        .catch((err) => {
            alert(err)
            console.log(err)
        })
    }

        // show no more cards and a button when there's no more options!!!! CHECK WITH CHLOE
        function moveToNextCard() {
            const endofSurvey = tail.length == 0; 
            //const isLoading = !tail.length;
            
            if (endofSurvey) {
                router.push(`/groups/${groupID}`)
                notification.success({
                    message: "End of survey!",
                    duration: 10,
                    // put a button here that will show up when the condition above is met
                });
                
                (async function getData() {
                   // need a blank one in here
                    setProfiles([]);
                })();

            } else {
                setProfiles([...tail]);
            }
        }
    }, 300);

    return (

        <div>

         {profiles.length == 0 ? 
             <Alert
             message="Warning Text"
             type="warning"
             action={
               <Space>
                <Button size="small" type="ghost">
                 Done
                </Button>
               </Space>
             }
             closable
            /> : 
           <div className={classes.root}>
        
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
       </div>
         }

         
        </div>
    );
}

export default SwipeMovie;