import React from "react";
import { Card } from "react-bootstrap";
import Router from "next/router";


const Final = ({ values }) => {

  const handleClick = () => {
   
    Router.push("/home")
  }


    //destructuring the object from values
  const { firstName, lastName, age, email, genreType } = values;
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
