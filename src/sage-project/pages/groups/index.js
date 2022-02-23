import Groups from "../../components/Dashboard/Groups/GroupsList";
import GroupsBanner from "../../components/Dashboard/Groups/GroupsBanner";
import Layout from "../../components/Layout/Layout";

const groupName = "Groups";
const buttonTitle = "Create a new group";

const GroupsPage = () => {

    return (
        <div>
            <Layout>
                <GroupsBanner groupName={groupName} buttonTitle={buttonTitle}/>
                <Groups/>
            </Layout>
        </div>
    );
}

export default GroupsPage;

// wrap layout component