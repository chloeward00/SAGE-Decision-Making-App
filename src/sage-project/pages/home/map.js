import React, {useState,useEffect } from "react";
import dynamic from "next/dynamic";
import 'firebase/firestore';
import 'firebase/firestore';
import fire from 'firebase/app'



const OsmMapNoSSR = dynamic(() => import("../../components/Map/osmMap.js"),{
    ssr: false,
});

export default function Home() {
    const coordinates = []
    
    const [latitude, setLatitude] = useState("")
    const [longitude, setLongitude] = useState("")
    //const[loc2, setLoc] = useState({lng: 53.363392004396104, lat: -6.209536 });
    const[location, setLocation] = useState({ lng: "", lat: ""});
    


    
     navigator.geolocation.getCurrentPosition(function(position) {
         
        
         const loc3 = {lat: position.coords.latitude, lng:position.coords.longitude};
        // setLoc(loc3);
        
         setLocation(loc3)
         //setLatitude(position.coords.latitude );
         //setLongitude(position.coords.longitude);
     
  }); 

  
  
    //console.log(loc2)

  

    //console.log(location)

    const getData = async () => {
        let currentUserUID = fire.auth().currentUser.uid
      
              const db = fire.firestore();
        
              ///firefunctions.addfavs
                db.collection("LocationChoice")
                .doc(currentUserUID)
                .set({
                  lat: location.lat,
                  long: location.lng,
                })
                
            }
      
              useEffect(() => {
                let mounted = false
        
                if(!mounted){
                  
                   getData()
                   
                
                }
                
                return () => {
                    mounted = true
                   // getData()
                }
            
            }, [location])
        

// const showMyLocation = () => {
//     if (location.loaded && !location.error) {
//       mapRef.current.leafletElement.flyTo(
//         [location.coordinates.lat, location.coordinates.lng],
//         ZOOM_LEVEL,
//         { animate: true }
//       );
//     } else {
//       alert("error");
//     }
//   };


// const map = useMapEvents({
//     click() {
//       map.locate()
//     },
//     locationfound(e) {
//       setPosition(e.latlng)
//       map.flyTo(e.latlng, map.getZoom())
//     },
//   })

    return(
        <div>
            <OsmMapNoSSR

                center={location}
                location={location}
                draggable={true}
                title="sample text"
                onDragMarker={(e) => {
                    console.log("e",e);
                    let loc = {lat: e.lng, lng:e.lat};
                    setLocation(loc);
                  
                }}
                
                
            />    
            
            
            {"lng: "+ location.lng}
            <br />
            {"lat: " + location.lat}
           

            {/* <button onClick={showMyLocation}>
Locate Me  
</button> */}
        </div>



        
    );
}