
import PageLayout from "../../../../components/Layout/PageLayout";
import { useState, useEffect } from 'react';
import fire from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth'
import { useRouter } from "next/router";
import IndividualEvent from "../../../../components/Dashboard/Events/IndividualEvent";
import EventsBanner from "../../../../components/Dashboard/Events/EventsBanner";
import Comments from "../../../../components/Dashboard/Comments/Comments";

const EventPage = () => {

    const router = useRouter();
    const url = router.asPath.split('/')
    const urlCategory = url[2]
  
    const groupID = router.query.group
    const eventID = router.query.event

    console.log("THIS IS THE GROUP ID  " + groupID)
    console.log("THIS IS THE EVENT ID  " + eventID)

    const [eventName, setEventName] = useState('')
    const [individualEventData, setIndividualEventData] = useState([])
    
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
                    console.log("print indi event heree  " + querySnapshot.data().eventID)
                    setEventName(querySnapshot.data().eventName)
                    setIndividualEventData(querySnapshot.data())
                }
            });
        }

        fetchData(); 

        return () => {
            isMounted = false
        }
 
    }, []); 

    return (
        <div>
            <PageLayout>
                <EventsBanner eventName={eventName} groupID={groupID} eventID={eventID} eventDetails={individualEventData} />
                <IndividualEvent eventName={eventName} eventID={eventID} groupID={groupID} eventDetails={individualEventData}/>
                <Comments/>
            </PageLayout>
        </div>
    );
}

export default EventPage;
