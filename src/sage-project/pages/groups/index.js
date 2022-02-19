import Groups from "../../components/Dashboard/Groups/Groups";
import GroupsBanner from "../../components/Dashboard/Groups/GroupsBanner";
import Layout from "../../components/Layout/Layout";


const GroupsPage = () => {

    return (
        <div>
            <Layout>
                <GroupsBanner/>
                <Groups/>
            </Layout>
        </div>
    );
}

export default GroupsPage;

// wrap layout component