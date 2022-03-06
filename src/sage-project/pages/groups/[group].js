import GroupsBanner from "../../components/Dashboard/Groups/GroupsBanner";
import Layout from "../../components/Layout/Layout";
import IndividualGroup from "../../components/Dashboard/Groups/IndividualGroup";

// const name = "BigBrains";
const buttonTitle = "See members";

const Group = () => {

    return (
        <div>
            <Layout>
                <GroupsBanner groupName={name} buttonTitle={buttonTitle}/>
                <IndividualGroup/>
            </Layout>
        </div>
    );
}

export default Group;

// wrap layout component