import React, { useState,useEffect } from "react";
import { favi } from "./Card";
import CancelIcon from "@material-ui/icons/Cancel"
import fire from 'firebase/app'
import 'firebase/firestore';
import firestores from "../../firebase/firebase";

import firefunctions from "../../firebase/firebase";



export default function Fav() {
  const [fs, setFs] = useState([]);
  
  const kkk = (index) => {
    favi.splice(index, 1);
    setFs([...favi]);
  };


 

  const getData = async () => {
  let currentUserUID = fire.auth().currentUser.uid

        const db = fire.firestore();
        ///var addfavss = firestores.addfavs();
        const doc = await fire
        .firestore()
        .collection('userFavs')
        .doc(currentUserUID)
        .get()
        ///firefunctions.addfavs
          db.collection("userFavs")
          .doc(currentUserUID)
          .set({
            favs: favi
          })
          
      }

        useEffect(() => {
          let mounted = false
  
          if(!mounted){
              getUserInfo()
              getData()
          }
          
          return () => {
              mounted = true
          }
      
      }, [])
  

      
  const getUserInfo = async () => {
    let currentUserUID = fire.auth().currentUser.uid
    
    let doc = await fire
    .firestore()
    .collection('userFavs')
    .doc(currentUserUID)
    .get()

    if (!doc.exists){
        console.log('no profile saved in the database. edit profile now')
    } else {
        let dataObj = doc.data();
        setFs(dataObj.favi)
  
    }
}

  return (
    <div className="favori">
      <div className="favoribg">
        <span> Your Favourites</span>
      </div>
      {favi.map((k, index) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >

          
          <div
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w500${k.url})`,
              margin: "10px",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
              position: "relative"
            }}
            className="card"
          >
            <CancelIcon
              fontSize="large"
              style={{
                position: "absolute",
                top: "2px",
                right: "2px",
                backgroundColor: "white",
                borderRadius: "50%"
              }}
              onClick={()=>kkk(index)}
            />
            <span>{k.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
}