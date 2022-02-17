import { Layout,Card,Form, Input, Button, Checkbox,message } from 'antd';
import Home from "../../components/Dashboard/Home";
import Head from "next/head";
import { DeleteOutlined, KeyOutlined } from "@ant-design/icons";
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import firebase from "../../firebase/firebase";
import { useState } from 'react';
import * as fireb from 'firebase'
import Router from "next/router";


export default function ChangeLogInPassword() {
    const profile = firebase.getProfile();

    const [fieldDict, setInputs] = useState({
        password: '',
        password2: ''
    })
        async function doChange(values) {
        message.loading({ key: "Change login password", content: "Attempting to change password" }); // 
        
        if(fieldDict.password === ''){
        console.log("No new password");
        alert('please enter a password')

    }  else if (fieldDict.password2 === ''){
            console.log("No new password");
            alert("Please enter your new password")
        }else if (fieldDict.password === fieldDict.password2){
        alert("Duplicate Passwords new password cannot be the same as old password.")
        //message.loading({ key: "Duplicate Passwords", content: "New password is the same as old" }); // 
    } else{
        try {
            await firebase.updatePasswords(fieldDict.password)
            message.success({ key: "Change login password", content: "You have successfully changed your account password" }); // when signed up
            Router.push("/home/profile");
        } catch (error) {
            // an error message which shows if account is not successfully created.
            message.error({
            key: "Change login password",
            content: error.message || "An error occurred when trying to change your password. Please try again.",
            });
        }
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
          onFinish={doChange} // When click the button is pressed
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
