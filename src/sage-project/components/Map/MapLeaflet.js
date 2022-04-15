import React, { useState,useEffect,useRef, useMemo } from "react";
import L from "leaflet";
import {MapContainer, TitleLayer, Marker, Popup, TileLayer, useMapEvents,} from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';


const MapLeaflet = ({ center, draggable, onDragMarker, location }) => {
    const markerRef = useRef(null);

    const mapRef = useRef();       

    useEffect( () => {

        const { current = {} } = mapRef;
        const { leafletElement: map } = current;

    }, [])


const dragHandlers = useMemo(
    () => ({
        dragend() {
            const marker = markerRef.current;
            if(marker != null ) {
                onDragMarker(marker.getLatLng());
                // eslint-disable-next-line react-hooks/exhaustive-deps
            }
        },
    }),
    [onDragMarker]
);

    return (  
        
        <MapContainer
            center={[53.384810, -6.263190]}
            zoom={15}
            scrollWheelZoom={true}
            style={{ height: "75vh", width: "75vw"}}
        >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

            <Marker
                icon={L.divIcon({
                iconSize: [60, 60],
                iconAnchor: [60, 60],
                className: "mymarker",
                html: "🔴",
                    
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

export default MapLeaflet;
