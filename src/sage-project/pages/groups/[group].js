import GroupsBanner from "../../components/Dashboard/Groups/GroupsBanner";
import Layout from "../../components/Layout/Layout";
import IndividualGroup from "../../components/Dashboard/Groups/IndividualGroup";
import { useRouter } from 'next/router'


const buttonTitle = "See members";

const Group = () => {

    const { asPath } = useRouter();
    // this reads the path where we take the groupname
    const url = asPath.split('/')
    const groupName = url[url.length - 1].split('%20').join(' ')

    return (
        <div>
            <Layout>
                <GroupsBanner groupName={groupName} buttonTitle={buttonTitle}/>
                <IndividualGroup/>
            </Layout>
        </div>
    );
}

export default Group;

// wrap layout component