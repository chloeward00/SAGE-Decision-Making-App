import GroupsBanner from "../../components/Dashboard/Groups/GroupsBanner";
import Layout from "../../components/Layout/Layout";
import IndividualGroup from "../../components/Dashboard/Groups/IndividualGroup";
import { useRouter } from 'next/router'
import { useState, useEffect } from "react";
import fire from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore';

const buttonTitle = "See members";

const Group = () => {
    const router = useRouter();
    console.log("MEHHHHH   " + router.query.group)

    const { asPath } = useRouter();
    // this reads the path where we take the groupname
    const url = asPath.split('/')
    const groupID = url[url.length - 1].split('%20').join(' ')

    const [name, setName] = useState('');
    const [members, setMembers] = useState('');
    const [description, setDescription] = useState('');
    const [createdAt, setCreatedAt] = useState('');

    const getUserInfo = async () => {
        let currentUserUID = fire.auth().currentUser.uid
        
        let doc = await fire
        .firestore()
        .collection('groups')
        .doc(groupID)
        .get()
    
        if (!doc.exists){
            console.log('no group saved in the database')
        } else {
            let dataObj = doc.data();
            setName(dataObj.groupName)
            setMembers(dataObj.groupMembers)
            setDescription(dataObj.description)
            setCreatedAt(dataObj.createdAt)
        }
    }

    
        useEffect(() => {
          let mounted = false

          if(!mounted){
              getUserInfo()
          }
          
          return () => {
              mounted = true
          }

      }, [])

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
