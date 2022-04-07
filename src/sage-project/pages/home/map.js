import React, {useState} from "react";

import dynamic from "next/dynamic";


const OsmMapNoSSR = dynamic(() => import("../../components/Map/osmMap.js"),{
    ssr: false,
});

export default function Home() {
    const coordinates = []
    
    const [latitude, setLatitude] = useState("")
    const [longitude, setLongitude] = useState("")

    navigator.geolocation.getCurrentPosition(function(position) {
        
        setLatitude(position.coords.latitude );
        setLongitude(position.coords.longitude);
     
 }); 
    const[location, setLocation] = useState({ lng: 53.363392004396104, lat: -6.209536});

//     lng: 53.363392004396104
// lat: -366.1387451118992



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