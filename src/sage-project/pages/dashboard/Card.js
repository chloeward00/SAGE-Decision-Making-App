import TinderCard from "react-tinder-card";
import { useState, useEffect,useMemo, useRef} from "react";
import React from 'react';
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";
import styles from '../../styles/Home.module.css';

export const favi = [];
export const Card = () => {
  const [people, setPeople] = useState([]);
  
  const peop = people;
  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/discover/movie?api_key=637ebc34a12fc235b39c60d6e3889d59&language=en-US&sort_by=popularity.desc&include_adult=false&with_genres=10749&Page1"
      )
      
      .then((res) => setPeople(res.data.results.reverse()));
      

      

  }, []);



  const db = peop
  const dblen = db.length
  const [currentIndex, setCurrentIndex] = useState()

  useEffect(() => { setCurrentIndex(people.length -1) }, [people])
  const [lastDirection, setLastDirection] = useState()
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex)

  const childRefs = useMemo(
    () =>
      Array(dblen)
        .fill(0)
        .map((i) => React.createRef()),
    []
  )

  console.log(childRefs)

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }

  const canGoBack = currentIndex < dblen - 1
  const canSwipe = currentIndex >= 0

  // set last direction and decrease current index
  const swiped = (direction, index, name, url) => {
    setLastDirection(direction)
    updateCurrentIndex(index - 1)
    if (name === "undefined"){
      name = "Name-Unavailable"
    }

    if (url === "null"){
      url = '/7uRbWOXxpWDMtnsd2PF3clu65jc.jpg';
    }
    if (direction === "right") {
      favi.push({ name, url });
      alert(name + " was swiped right and added to your favourites") // can add r left too but i feel like it takes the fun away when alerts keep popping up idk 
    }
    
  }

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  }

  //alert(currentIndex + " " + dblen)


  // functioanlity for buttons
  //alert("Swiping!")
  const swipe = async (dir) => {
    if (canSwipe && currentIndex < dblen ) {
      await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
    }
  }

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return
    const newIndex = currentIndex + 1
    updateCurrentIndex(newIndex)
    await childRefs[newIndex].current.restoreCard()
  }

  return (

    
    
    <div>
   
      <h1>React Tinder Card</h1>
      <div className={styles.cardContainer}>
        {db.map((k, index) => (
          
          <TinderCard
            ref={childRefs[index]}
            className={styles.swipe}
            key={k.id}
            
            onSwipe={(dir) => swiped(dir,index,k.original_title, k.poster_path,childRefs[index])}
            onCardLeftScreen={() => outOfFrame(k.original_title,index)}
          
          >
            <div
            
              style={{  backgroundImage: `url(https://image.tmdb.org/t/p/w500${k.poster_path})` }}
              className={styles.card}
            >
            
            </div>

            
            <h6
               style={{                 color: "white",
                 position: "absolute",
                 bottom: "0",
                 backgroundSize: "2px",
                 borderRadius: "25x",
                 backgroundColor: "#F89EFE"
               }}
             >
                
                
                {k?.original_title}</h6>
          </TinderCard>

          
        ))}
      </div>
      <div className={styles.buttons}>
        <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('left')}>Swipe left!</button>
        <button style={{ backgroundColor: !canGoBack && '#c3c4d3' }} onClick={() => goBack()}>Undo swipe!</button>
        <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('right')}>Swipe right!</button>
      </div>
   
    </div>
  )
};