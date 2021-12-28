import Head from "next/head";
import { Form, Input, Button, message } from "antd";
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import firebase from "../firebase/firebase";
import Router from "next/router";
import { useEffect } from "react";

export default function signup() {
  useEffect(() => { 
    if (firebase.isLoggedIN()) {
      Router.push("/dashboard");
    }
  });

  async function doSignup(values) {
    message.loading({ key: "SignedUp", content: "Signing up!" }); // sho
    try {
      await firebase.register(values);
      message.success({ key: "SignedUp", content: "You have successfully created your account!" }); // when signed up
      Router.push("/login");
    } catch (error) {
      // an error message which shows if account is not successfully created.
      message.error({
        key: "Create Account",
        content: error.message || "An error occurred when trying to create your account. Please try again.",
      });
    }
  }

  return (
    <>
   

 

      <Head>
        <title>Create Account</title>
      </Head>

      
      <main className="fullscreenflexmiddle">
        <h2 style={{ fontSize: 25, marginBottom: 30 }}>Create Account</h2>
        <Form
          name="signup"
          style={{ width: "100%", maxWidth: 350 }}
          initialValues={{ remember: true }}
          onFinish={doSignup} // When click the Signup Button
        >
          <Form.Item name="name" rules={[{ required: true, message: "" }]}>
            <Input size="large" prefix={<UserOutlined />} placeholder="Name" />
          </Form.Item>
          <Form.Item name="email" rules={[{ required: true, message: "" }]}>
            <Input size="large" prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>

          
          <Form.Item name="password" rules={[{ required: true, message: "" }]}>
            <Input
              size="large"
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button size="large" type="primary" htmlType="submit" block>
              Create Account
            </Button>
          </Form.Item>
        </Form>
      </main>
    </>
  );
}
