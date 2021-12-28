import { Layout, Card, message } from "antd";
import Header from "../../components/header";
import Head from "next/head";
import { DeleteOutlined, KeyOutlined } from "@ant-design/icons";
import firebase from "../../firebase/firebase";


export default function profile() {
  const profile = firebase.getProfile();

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <Layout>
        <Header activeKey={"2"} />
        <Layout.Content style={{ padding: "0 50px", marginTop: 64 }}>
          <div className="site-layout-background mainlayout">
                <Card.Meta
                  title={ <>{profile.name} </>}
                  description={profile.email}/>
      
          </div>
        </Layout.Content>
      </Layout>
    </>
  );
}
