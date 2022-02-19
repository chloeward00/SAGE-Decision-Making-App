import Events from "../../components/Dashboard/Events/Events";
import Layout from "../../components/Layout/Layout";

const HomeDashboard = () => {

    return (
        <div>
            <Layout>
                <Events/>
            </Layout>
        </div>
    );
}

export default HomeDashboard;

// wrap layout component
// list of all the events of the user from all groups they joined