import React, { useEffect }  from "react";
import { Card } from "react-bootstrap";
import Router from "next/router";
import fire from 'firebase/app';


const Final = ({ values }) => {

  const handleClick = () => {
   
    Router.push("/home")
  }




    //destructuring the object from values
  const { firstName, lastName, age, email, genreType } = values;


  const getData = async () => {
    let currentUserUID = fire.auth().currentUser.uid
  
          const db = fire.firestore();
          ///var addfavss = firestores.addfavs();
          const doc = await fire
          .firestore()
          .collection('userSurvey')
          .doc(currentUserUID)
          .get()
          ///firefunctions.addfavs
            db.collection("userSurvey")
            .doc(currentUserUID)
            .set({
              Name: firstName, 
              Surname: lastName, 
              Age: age, 
              email: email,
              Genre: genreType 
            })
          }
          
          useEffect(() => {
            let mounted = false
    
            if(!mounted){
                getData()
            }
            
            return () => {
                mounted = true
            }
        
        }, [])
  
  
  return (
    <>
      <Card style={{ marginTop: 100, textAlign: "left" }}>
        <Card.Body>
          <p>
            <strong>First Name :</strong> {firstName}{" "}
          </p>
          <p>
            <strong>Last Name :</strong> {lastName}{" "}
          </p>
          <p>
            <strong>Age :</strong> {age}{" "}
          </p>
          <p>
            <strong>Email :</strong> {email}{" "}
          </p>
          <p>
            <strong>Genre Type :</strong> {genreType}{" "}
          </p>
        </Card.Body>
      </Card>

      <button
             
            onClick={handleClick}
              type="button"
            >
              Finish  Survey
            </button>
    </>
  );
};

export default Final;
