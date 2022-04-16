import GroupsBanner from "../../../components/Dashboard/Groups/GroupsBanner";
import Layout from "../../../components/Layout/Layout";
import IndividualGroup from "../../../components/Dashboard/Groups/IndividualGroup";
import { useRouter } from 'next/router'
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import fire from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore';
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from '@mui/styles';
import PageLayout from "../../../components/Layout/PageLayout";


const buttonTitle = "See members";

const useStyles = makeStyles((theme) => ({
    avatar: {
        width: 20,
        height: 20,
        fontSize: 10,
        backgroundColor: theme.colours.pink,
        marginTop: 25,
        margin: 'auto',
        left: 80
        
    },
    avatarWhite: {
        width: 10,
        height: 20,
        borderRadius: 100 / 2,
        backgroundColor: 'white',
        margin: 'right',
        marginTop: 30,
    }
}))

const Group = () => {
    const classes = useStyles();
    const router = useRouter();
    const groupID = router.query.group

    const [groupName, setGroupName] = useState('');

    useEffect(() => {

        async function fetchData() {
            //  calling firebase like this does not lag when updated
            await fire.firestore().collection('groups').where("groupID", "==", groupID)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    console.log("printing admin deeeets here  " + doc.data().groupName);
                    // setGroupCreator(doc.data().groupAdmin)
                    setGroupName(doc.data().groupName)
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
        }

        fetchData()
    });

    return (
        <div>
            <PageLayout>
                <GroupsBanner groupName={groupName} buttonTitle={buttonTitle} groupID={groupID}/>
                <IndividualGroup groupID={groupID}/>
            </PageLayout>    
        </div>
        
    );
}

export default Group;