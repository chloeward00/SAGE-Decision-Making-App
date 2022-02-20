import { Layout, Button} from "antd";
import Header from "../../components/header";
import Router from "next/router";
import Link from 'next/link'

export default function dashboard() {

  // const handleClick = e => {
  // //const handleClick() {
  //   Router.push("/dashboard/Movies");
  // }

  return (
       
      <Layout>
        <Header activeKey={"1"} />
        <Layout.Content style={{ padding: "0 50px", marginTop: 64 }}>
          <div className="site-layout-background mainlayout">
            <div className="container">
              <p>Logged in successfully</p>
              <p>Working on the Delete Account now to get to that just put Delete-Account in the url</p>
        
            <li>
            <Link href="dashboard/Movies">
            <a>Movie Section: Not styled</a>
            </Link>
            </li>

            <li>
            <Link href="dashboard/Home">
            <a>Tinder: Movies</a>
            </Link>
            </li>

            <li>
            <Link href="dashboard/Yelp">
            <a>Yelp: Not styled</a>
            </Link>
            </li>
              

            </div>
          </div>
          
          
        </Layout.Content>
      </Layout>
   
  );
}
