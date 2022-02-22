import FullCalendar from "@fullcalendar/react";
import interactionPlugin,{ DateClickArg } from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid"; // this is for day time calendar
import daygridPlugin from "@fullcalendar/daygrid";
import ResponsiveDrawer from "../../components/Dashboard/Drawer/SideDrawer";
import fire from 'firebase/app'
import {getFirestore, addDoc,collection} from 'firebase/firestore';
import React, { useState,useEffect,useRef } from "react";

export const allEvents = [];

const Calendar = () => {
  const calendarRef = useRef(null);
  const [date, setData] = useState([]);


   const kkk = (index) => {
     allEvents.splice(index, 1);
     setData([...allEvents]);
   };
  const handleDateClick = async (DateClickArg) => {


      if(DateClickArg.jsEvent.altKey){
          const title = prompt("Enter title",DateClickArg.dateStr); // allows user to put a title in
          // making object
          const event = {
              title: title ? title : DateClickArg.dateStr,
              start: DateClickArg.date,
              allDay: true
          }

          allEvents.push(event)

          const db = fire.firestore();
          let currentUserUID = fire.auth().currentUser.uid
          const doc = await fire
                      .firestore()
                      .collection("userCalendar")
                      .doc(currentUserUID)
                      .get()
                    
                      //  db.collection("userCalendar")
                      //  .doc(currentUserUID)
                      //  .update({
                      //   activites: fire.firestore.FieldValue.arrayUnion(
                      //     {
                      //         allEvents
                      //     })
                      //  }
                      // )

                      db.collection("userCal/"+currentUserUID+"/activities").add({event})
          
      }
     
  
  }

      const getUserInfo = async () => {
        let currentUserUID = fire.auth().currentUser.uid
        const db = fire.firestore();
        
        // let doc = await fire
        // .firestore()
        // .collection('userCal')
        // .doc(currentUserUID)
        // .collection("activities")
        // .get()

        // if (!doc.exists){
        //     console.log('no Calendar data. Make sure to add events to calendar!')
        // } else {
    //         // let dataObj = doc.data();
    //         // setData(dataObj.allEvents)
    //         const array = []
    //         db.collection("userCalendar").doc(currentUserUID)
    //         .onSnapshot((doc) => {

    //         //console.log("Current data: ", doc.data());
    //         console.log(doc.get('title') + "looooooool")
    // });

              const qSnap = await fire
               .firestore()
               .collection('userCal')
               .doc(currentUserUID)
               .collection("activities")
               .get()
            
            const data = []
            data = (qSnap.docs.map(d => ({ id: d.id, title: d.data().event.title, start: d.data().event.start, allDay: d.data().event.allDay,...d.data() })));
            
            //setData(data)
            console.log(data);
            setData([...data])

  
}


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
      <>
  
    <FullCalendar
      innerRef={calendarRef}
      plugins={[daygridPlugin,interactionPlugin]}
      dateClick={handleDateClick}
      editable
      selectable
      // when adding events with firebase
      events={date}
  
      
    />
    </>
  );
};

export default Calendar;