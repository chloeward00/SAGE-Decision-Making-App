import { Layout, Card, message } from "antd";
import Head from "next/head";
import { DeleteOutlined, KeyOutlined, MailOutlined } from "@ant-design/icons";
import firebase from "../../firebase/firebase";
import Router from "next/router";
import React, { useState, useEffect} from 'react'
import fire from 'firebase/app'
import 'firebase/firestore';

export default function EditProfilePage() {
    const profile = firebase.getProfile();
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
  

    const handlePress = async () => {
      let currentUserUID = fire.auth().currentUser.uid
      const db = fire.firestore();
      db.collection("UserProfile")
      .doc(currentUserUID)
      .set({
        Name: name,
        Bio: bio
      })
      Router.push("/home")  
    }

    const getUserInfo = async () => {
          let currentUserUID = fire.auth().currentUser.uid
            
          let doc = await fire
          .firestore()
          .collection('UserProfile')
          .doc(currentUserUID)
          .get()
        
          if (!doc.exists){
              console.log('no profile saved in the database. edit profile now')
            } else {
              let dataObj = doc.data();
              setName(dataObj.Name)
              setBio(dataObj.Bio)
            }
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
      <Head>
        <title>Profile | Firenext</title>
      </Head>
      <Layout>
  
        <Layout.Content style={{ padding: "0 50px", marginTop: 64 }}>
          <div className="site-layout-background mainlayout">
            <div className="container">
              <Card
                style={{ width: 300, marginTop: 16 }}
                actions={[
                  <DeleteOutlined
                  key="delete"
                  onClick={async () => {
                    // just using window confirm dialog box here. It comes up ok and cancel tho it wont let me change it to confirm but i think thats ok
                    const confirmBox = window.confirm(
                      "Are you sure you want to delete your account? Action cannot be recovered"
                    )
                    if (confirmBox === true) {
                      var trytodelete = await firebase.deleteAccount();
                      if (trytodelete) {
                        message.success("User deleted");
                        Router.push("/create-account");
                      } else {
                        message.error("Something went wrong !");
                      }
                    }
                  
                  }}
                />,

                <MailOutlined
                key="delete"
                onClick={async () => {
                  
                  Router.push("/profile/changeemail"); // goes to the change email page
                }}
              />,
                <KeyOutlined
                    key="changepass"
                    onClick={async () => {
                        Router.push("/profile/changepassword"); // goes to change login password page
                    }}
                  />,
                ]}
              >
                <Card.Meta
                  title={
                    <>
                      {profile.name} (
                      {profile.verified ? (
                        "verified"
                      ) : (
                        <span
                          style={{ color: "skyblue", cursor: "pointer" }}
                          onClick={async () => {
                            var sendverification =
                              await firebase.sendVerification();
                            if (sendverification) {
                              message.success("Verification email sent");
                            } else {
                              message.error(
                                "Something went wrong while sending verification"
                              );
                            }
                          }}
                        >
                          not verified
                        </span>
                      )}
                      )
                    </>
                  }
                  description={profile.email}
                />
              </Card>
            </div>
          </div>
          
          <form>
      <label>Name:
        <input
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>Bio:
        <input
          type="text" 
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </label>
    </form>
        </Layout.Content>
      </Layout>

      <button
              
              onClick={handlePress}
              type="button"
            >
              Submit
            </button>
        
    </>
  );
}