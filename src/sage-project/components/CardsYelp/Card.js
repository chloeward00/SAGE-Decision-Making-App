import TinderCard from "react-tinder-card";
import { useState, useEffect,useMemo, useRef} from "react";
import React from 'react';
import axios from "axios";
import styles from '../../styles/Home.module.css';
import {yelpAPIKey} from '../../YELP-API/YelpAPI.js';

export const favi = [];
export const Card = () => {

  

  // places rendered by yelp api
  const [places, setPlaces] = useState([]);
  const [lat, setLatitude] = useState();
  const [long, setLongitude] = useState();
  

  // Set radius from current location as 4 km.
  const radius = 10;
  // Set limit for number of places as 30.
  const limit = 15;

  
  const config = {
    headers: {
      Authorization: 'Bearer ' + yelpAPIKey,
    },
  };


  // console.log(lat)
  // console.log(long)
   useEffect(() => {
      
          navigator.geolocation.getCurrentPosition(function(position) {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
       
        });

}, [])


  useEffect(() => {
  
     axios
      .get(
        'http://localhost:8080/https://api.yelp.com/v3/businesses/search?term=Food&latitude=' +
          (lat) + // cordinates for coolock
          '&longitude=' +
          (long) +
          '&limit=' +
          limit,
          config,
      )

 
      .then(place => {
       
        setPlaces(
          place.data.businesses.map(x => ({
            name: x.name,
            image_url: x.image_url,
        })),
      );
    })
    .catch(error => {
      console.log(error);
    });
  });

  const swiped = (direction, index, name, url) => {

    if (direction === "right") {
    
      alert(name + " was swiped right and added to your favourites") // can add r left too but i feel like it takes the fun away when alerts keep popping up idk 
      favi.push({name,url})
      console.log(favi + "loooool")
    }
    
  }

  return (    
    
    <div>
   
      <h3>Swipe right to add to your favourites!</h3>
      <div className={styles.cardContainer}>
        {places.map((k, index) => (
          
          <TinderCard
           
            className={styles.swipe}
            //key={k.id[0]}
            onSwipe={(dir) => swiped(dir,index,k.name, k.image_url)}
            //onCardLeftScreen={() => outOfFrame(k.name,index)}
          
          >
            <div
            
              style={{  backgroundImage: `url(${k.image_url})`  }}
              className={styles.card}
              
            >
            
            </div>

            
            <h6
               style={{                 
                 color: "white",
                 position: "absolute",
                 bottom: "0",
                 backgroundSize: "2px",
                 borderRadius: "25x",
                 backgroundColor: "#F89EFE"
               }}
             >
                
                
                {k?.name}</h6>
          </TinderCard>

          
        ))}
      </div>
     
   
    </div>
  )
};