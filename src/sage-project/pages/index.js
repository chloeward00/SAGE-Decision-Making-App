import Head from "next/head";
import Header from "../components/LandingPage/Header"
import Footer from "../components/LandingPage/Footer";
import FeatureCard from "../components/LandingPage/Features";

const Home = () => {
    return (  
        <div>
            <Head>
                <title>SAGE</title>
                <meta name="description" content="sage decision making app"></meta>
            </Head>
            <Header/>
            <FeatureCard/>
            <Footer/>
        </div>
    ); 
}

export default Home;