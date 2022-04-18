import "antd/dist/antd.css";
import { useEffect, useState } from "react";
import { notification, Spin, Layout } from "antd";
import SideBar from "../../../../components/SwipeActivity/Cards/Sidebar";
import { debounce, getLocalViewedProfiles, setLocalViewedProfiles } from "../../../../components/SwipeActivity/utilities"
import ProfileCards from "../../../../components/SwipeActivity/Cards/profile-cards";
import { getYELPData } from "../../../../hooks/yelp-api/useCategoriesSearch";
import { useRouter } from "next/router";
import fire from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth'
import Button from '@mui/material/Button';
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

const SwipeOptions = () => {

    const router = useRouter()
    const classes = useStyles()

    const groupID = router.query.swipe.split('&')[0]
    const eventID = router.query.swipe.split('&')[1]
    const categoriesAdmin = router.query.swipe.split('&')[2]
    const latitudeList = router.query.swipe.split('&')[3]
    const longitudeList = router.query.swipe.split('&')[4]

    const latitudeValue = latitudeList.split('=')[1]
    const longitudeValue = longitudeList.split('=')[1]

    console.log(longitudeValue)
    console.log("swipe page params here  " + categoriesAdmin, longitudeValue, latitudeValue)
    console.log('categories admin picksss hereeeee  ' + categoriesAdmin)
    console.log(router.query.swipe)

    const [profiles, setProfiles] = useState([]);
    const [viewedProfiles, setViewedProfiles] = useState([]);
    const [viewSelected, setViewSelected] = useState([]);

    useEffect(() => {
        (async function getData() {
            // setViewedProfiles(getLocalViewedProfiles());
            const fetchedProfiles = await getYELPData({ categoriesAdmin, latitudeValue, longitudeValue});
            if(fetchedProfiles.length == 0){
                notification.error({
                    message: "No Data for this category available!",
                    duration: 5,
                    
                })

                router.push(`/groups/${groupID}`)
                
            }
            setProfiles([...fetchedProfiles]);
        })();
    }, []);

    const debouncedSwipe = debounce(function handleSwipe(type) {
        
        const [head, ...tail] = profiles;

        processCurrentCardAction();

        moveToNextCard();

        async function processCurrentCardAction() {
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
                    duration: 1,
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
        <div className={classes.root}>
            {/* <SideBar
             viewSelected={viewSelected}
             selectView={setViewSelected}
             viewedProfiles={viewedProfiles}
             /> */}
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
    );
}

export default SwipeOptions;