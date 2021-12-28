import { Layout,Card,Form, Input, Button, Checkbox } from 'antd';
import Header from "../../components/header";
import Head from "next/head";
import { DeleteOutlined, KeyOutlined } from "@ant-design/icons";
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import firebase from "../../firebase/firebase";
import { useState } from 'react';

export default function profile() {
  const profile = firebase.getProfile();

 

    async function doSignup(values) {
      message.loading({ key: "SignedUp", content: "Signing up!" }); // sho
      const [password, setNewPassword] = useState("")
      const [password2, setNewPassword2] = useState("")

      if(password2 == ""){
        Alert.alert("", "Please Enter a password.")

      }
    }


  return (
    <>
    

      <Head>
        <title>Delete Account </title>
      </Head>
      

      
      <main className="fullscreenflexmiddle">
        <h2 style={{ fontSize: 25, marginBottom: 30 }}>Delete Account</h2>
        <Form
          name="signup"
          style={{ width: "100%", maxWidth: 350 }}
          initialValues={{ remember: true }}
          onFinish={doSignup} // When click the Signup Button
        >
       

          
          <Form.Item name="password" rules={[{ required: true, message: "" }]}>
            <Input
              size="large"
              prefix={<LockOutlined />}
              name="password"
              type="password"
              placeholder="Password"
              onChange={(password) => setNewPassword(password.target.value)} 
            />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: "" }]}>
            <Input
              size="large"
              prefix={<LockOutlined />}
              name="password2"
              type="password2"
              placeholder="Retype Password"
              onChange={(password2) => setNewPassword2(password2.target.value)} 
            />
          </Form.Item>

          <Form.Item
        label="Password"
        placeholder="Password"
        name="password"
        rules={[
          {
            required: false,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input placeholder="Password" />
        <Input.Password />
      </Form.Item>

          <Form.Item>
            <Button size="large" type="primary" htmlType="submit" block>
              Delete Account
            </Button>
          </Form.Item>
        </Form>
      </main>
    </>
  );
}