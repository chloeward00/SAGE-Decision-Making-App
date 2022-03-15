import GroupsBanner from "../../components/Dashboard/Groups/GroupsBanner";
import Layout from "../../components/Layout/Layout";
import IndividualGroup from "../../components/Dashboard/Groups/IndividualGroup";
import { useRouter } from 'next/router'

const name = "Big Brains";
const buttonTitle = "See members";

const Group = () => {
    const router = useRouter();
    console.log("MEHHHHH   " + router.query.group)

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