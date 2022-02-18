import { Layout,Card,Form, Input, Button, Checkbox,message } from 'antd';
import Header from "../../components/header";
import Head from "next/head";
import { DeleteOutlined, KeyOutlined } from "@ant-design/icons";
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import firebase from "../../firebase/firebase";
import { useState } from 'react';
import * as fireb from 'firebase'
import Router from "next/router";


export default function ChangeAccountEmail() {
  const profile = firebase.getProfile();

  const [fieldDict, setInputs] = useState({
    emailaddress: '',
    newemailaddress: '',
    password: ''
})
    async function doChange(values) {
      message.loading({ key: "Change email address", content: "Attempting to change email address" }); // 
      if (fieldDict.emailaddress === fieldDict.newemailaddress){
            alert("Duplicate emails new email cannot be the same as old email.")
        }else if(fieldDict.emailaddress !== fieldDict.newemailaddress) {
          try {
        await firebase.updateUsersEmail(fieldDict.password,fieldDict.newemailaddress)
        message.success({ key: "Change email address", content: "You have successfully changed your accounts email address" }); // when signed up
        Router.push("/dashboard/profile");
      } catch (error) {
        // an error message which shows if email address isn't successfully updated
        message.error({
          key: "Change email address",
          content: error.message || "An error occurred when trying to change your accounts email address. Please try again.",
        });
      }
    }
    }
  return (
    <>
    

      <Head>
        <title>Change Account Email</title>
      </Head>

      <main className="fullscreenflexmiddle">
        <h2 style={{ fontSize: 25, marginBottom: 30 }}>Change Account Email</h2>
        <Form
          name="signup"
          style={{ width: "100%", maxWidth: 350 }}
          initialValues={{ remember: true }}
          onFinish={doChange} // When click the Signup Button
        >
    
       <Form.Item name="email" rules={[{ required: true, message: "" }]}>
            <Input size="large" 
            prefix={<MailOutlined />} 
            placeholder="Current Email"
            onInput={e => {setInputs(prevFieldDict=> ({...prevFieldDict, emailaddress: e.target.value}))}}
            />
          </Form.Item>

          <Form.Item name="new-email" rules={[{ required: true, message: "" }]}>
            <Input size="large" 
            prefix={<MailOutlined />} 
            placeholder="New Email"
            onInput={e => {setInputs(prevFieldDict=> ({...prevFieldDict, newemailaddress: e.target.value}))}}
            />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: "" }]}>
            <Input
              size="large"
              prefix={<LockOutlined />}
              name="password"
              type="password"
              onInput={e => {setInputs(prevFieldDict=> ({...prevFieldDict, password: e.target.value}))}}
              placeholder="Password"
            
            />
          </Form.Item>

          <Form.Item>
            <Button size="large" type="primary" htmlType="submit" block>
              Change Email
            </Button>
          </Form.Item>
        </Form>
      
      </main>
    </>
  );
}
