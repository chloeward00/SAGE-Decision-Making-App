import "antd/dist/antd.css";
import { useEffect, useState } from "react";
import { notification, Spin, Layout } from "antd";
import SideBar from "../../../../components/SwipeActivity/components2/Sidebar";
import { debounce, getLocalViewedProfiles, setLocalViewedProfiles } from "../../../../components/SwipeActivity/utilities"
import ProfileCards from "../../../../components/SwipeActivity/components2/profile-cards";
import { getYELPData } from "../../../../hooks/yelp-api/useCategoriesSearch";
import { useRouter } from "next/router";
import fire from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth'


const { Footer, Content } = Layout;
const REMAINING_PROFILES_THRESHOLD = 2;

const SwipeOptions = () => {

    const router = useRouter()

    const groupID = router.query.swipe.split('&')[0]
    const eventID = router.query.swipe.split('&')[1]
    const categoriesAdmin = router.query.swipe.split('&')[2]

    console.log("swipe page params here  " + groupID, eventID, categoriesAdmin)
    console.log('categories admin picksss hereeeee  ' + categoriesAdmin)

    const [profiles, setProfiles] = useState([]);
    const [viewedProfiles, setViewedProfiles] = useState([]);
    const [viewSelected, setViewSelected] = useState([]);

    useEffect(() => {
        (async function getData() {
            // setViewedProfiles(getLocalViewedProfiles());
            const fetchedProfiles = await getYELPData({groupID, eventID, categoriesAdmin});
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
            const isTimeToPrefetchData = tail.length <= REMAINING_PROFILES_THRESHOLD; 
            const isLoading = !tail.length;
            
            if (isTimeToPrefetchData) {
                notification.success({
                    message: "Prefetch 5 more cards",
                    duration: 1,
                });
                (async function getData() {
                    const fetchedProfiles = await getYELPData({groupID, eventID, categoriesAdmin});
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

export default SwipeOptions;