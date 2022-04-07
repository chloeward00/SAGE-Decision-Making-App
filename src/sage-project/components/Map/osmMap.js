import React, { useState,useEffect,useRef, useMemo } from "react";
import L from "leaflet";
import {MapContainer, TitleLayer, Marker, Popup, TileLayer, useMapEvents} from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import MarkerLogo from '../../assets/sage_1_cropped.png'
import { icon } from "leaflet";



const osmMap = ({ center, draggable, onDragMarker, location }) => {
    const markerRef = useRef(null);

    const mapRef = useRef();

 

useEffect( () => {

    const { current = {} } = mapRef;
    const { leafletElement: map } = current;
    
    mapRef.locate()


}, [])


const dragHandlers = useMemo(
    () => ({
        dragend() {
            const marker = markerRef.current;
            if(marker != null ) {
                onDragMarker(marker.getLatLng());
            }
        },
    }),
    []
);

var LeafIcon = L.Icon.extend({
    options: {
        iconSize: [40,40],
    },
});

var customIcon = new LeafIcon({ iconUrl:MarkerLogo})

// const ICON = icon({
//     iconUrl: "../../assets/marker2.png",
//     iconSize: [32, 32],
//   })


const ICON = icon({
    iconUrl: "../../assets/marker2.png",
    iconSize: [32, 32],
  })

    return (  
       
  <MapContainer
    center={[center.lng, center.lat]}
    zoom={13}
    scrollWheelZoom={false}
    style={{height: 700, width: "60%"}}
    >
<TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

    <Marker
   //icon={ICON}
    icon={L.divIcon({
    iconSize: [60, 60],
     iconAnchor: [60, 60],
     className: "mymarker",
     html: "😊",
     
   })}
    
    position={[
        location && location.lng ? location.lng : "",
        location && location.lat ? location.lat : "",
    ]}
    draggable={draggable}
    eventHandlers = {dragHandlers}
    ref={markerRef}
    >
    <Popup>{"Chosen Location"}</Popup>
    </Marker>
  </MapContainer>
     
    );

    };
export default osmMap;