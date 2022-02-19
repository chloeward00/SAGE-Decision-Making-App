import GroupsBanner from "../../components/Dashboard/Groups/GroupsBanner";
import Layout from "../../components/Layout/Layout";
import IndividualGroup from "../../components/Dashboard/Groups/IndividualGroup";
import { useRouter } from 'next/router'
import CustomizedDialogs from "../../components/Dashboard/Groups/MembersDialog";


const name = "Big Brains";
const buttonTitle = "Invite a member";

const Group = () => {

    return (
        <div>
            <Layout>
                <GroupsBanner groupName={name} buttonTitle={buttonTitle}/>
                <CustomizedDialogs/>
                <IndividualGroup/>
            </Layout>
        </div>
    );
}

export default Group;

// wrap layout component