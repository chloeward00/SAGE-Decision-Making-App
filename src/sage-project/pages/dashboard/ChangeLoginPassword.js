import { Layout,Card,Form, Input, Button, Checkbox,message } from 'antd';
import Header from "../../components/header";
import Head from "next/head";
import { DeleteOutlined, KeyOutlined } from "@ant-design/icons";
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import firebase from "../../firebase/firebase";
import { useState } from 'react';
import * as fireb from 'firebase'
import Router from "next/router";


export default function profile() {
  const profile = firebase.getProfile();

 

  const [fieldDict, setInputs] = useState({
    password: '',
    password2: ''
})

    //async function doChange(values) {
      //message.loading({ key: "SignedUp", content: "Signing up!" }); // sho
    
   

    

  //     if(fieldDict.password === ''){
  //       console.log("No new password");
  //       alert('please enter a password')

  //     }  else if (fieldDict.password2 === ''){
  //       console.log("No new password");
  //       Alert.alert("Please enter your new password")
  //     }else if (fieldDict.password === fieldDict.password2){
  //     Alert.alert("Duplicate Passwords","New password cannot be the same as old password.")
  // } else{
  

    // await firebase.updatePasswords(fieldDict.password2)
    // alert('A name was submitted: ' + fieldDict.password2); 
    // message.success({ key: "SignedUp", content: "You have successfully created your account!" }); // when signed up
    // Router.push("/dashboard/profile");
 

    async function doChange(values) {
      message.loading({ key: "SignedUp", content: "Changing password" }); // sho
      try {
        await firebase.updatePasswords(fieldDict.password2)
        message.success({ key: "Change login password", content: "You have successfully changed your account password" }); // when signed up
        Router.push("/dashboard/profile");
      } catch (error) {
        // an error message which shows if account is not successfully created.
        message.error({
          key: "Change login password",
          content: error.message || "An error occurred when trying to change your password. Please try again.",
        });
      }
    }
  


         

    

  return (
    <>
    

      <Head>
        <title>Change Password</title>
      </Head>
      

      
      <main className="fullscreenflexmiddle">
        <h2 style={{ fontSize: 25, marginBottom: 30 }}>Change Login Password</h2>
        <Form
          name="signup"
          style={{ width: "100%", maxWidth: 350 }}
          initialValues={{ remember: true }}
          onFinish={doChange} // When click the Signup Button
        >
       

          
          <Form.Item name="password" rules={[{ required: true, message: "" }]}>
            <Input
              size="large"
              prefix={<LockOutlined />}
              name="password"
              type="password"
              //onChange={handleClick()}
              onInput={e => {setInputs(prevFieldDict=> ({...prevFieldDict, password: e.target.value}))}}
              placeholder="Password"
            
            />
          </Form.Item>

          <Form.Item name="password2" rules={[{ required: true, message: "" }]}>
            <Input
                size="large"
                // prefix={<LockOutlined />}
                 type="password2"
               //  onChange={handleClick()}
                 onInput={e => {setInputs(prevFieldDict=> ({...prevFieldDict, password2: e.target.value}))}}
                 placeholder="Password2"
               
            />
          </Form.Item>


          <Form.Item>
            <Button size="large" type="primary" htmlType="submit" block>
              Change Password
            </Button>
          </Form.Item>
        </Form>
      </main>
    </>
  );
}
