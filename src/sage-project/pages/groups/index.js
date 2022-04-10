import Groups from "../../components/Dashboard/Groups/GroupsList";
import GroupsBanner from "../../components/Dashboard/Groups/GroupsBanner";
import Layout from "../../components/Layout/Layout";
import PageLayout from "../../components/Layout/PageLayout";

const groupName = "Groups";
const buttonTitle = "Create a new group";
const groupID = "";

const GroupsPage = () => {

    return (
        <div>
            <PageLayout>
                <GroupsBanner groupID={groupID} groupName={groupName} buttonTitle={buttonTitle}/>
                <Groups/>
            </PageLayout>
        </div>
    );
}

export default GroupsPage;
