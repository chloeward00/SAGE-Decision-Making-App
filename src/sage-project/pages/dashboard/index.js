import { Layout, Result } from "antd";

export default function dashboard() {
  return (
       
      <Layout>
        <Layout.Content style={{ padding: "0 50px", marginTop: 64 }}>
          <div className="site-layout-background mainlayout">
            <div className="container">
              <p>Logged in successfully</p>
              <p>Working on the Delete Account now to get to that just put Delete-Account in the url</p>
            </div>
          </div>
        </Layout.Content>
      </Layout>
  );
}
