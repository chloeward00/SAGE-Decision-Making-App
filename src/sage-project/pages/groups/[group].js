import GroupsBanner from "../../components/Dashboard/Groups/GroupsBanner";
import Layout from "../../components/Layout/Layout";
import IndividualGroup from "../../components/Dashboard/Groups/IndividualGroup";
import { useRouter } from 'next/router'
import React, {useEffect, useContext, useState} from 'react'
import 'firebase/firestore';
import fire from 'firebase/app'
import { makeStyles } from '@mui/styles';
import GroupsCard from '../../components/Dashboard/Groups/GroupsCard';


import { Grid, Container, Typography } from '@mui/material';


const buttonTitle = "See members";

const useStyles = makeStyles((theme) => ({
    page: {
        padding: '50px',
        marginTop: theme.spacing(-6)
    }
}))

const Group = () => {
    const classes = useStyles();
    

    const { asPath } = useRouter();
    // this reads the path where we take the groupname
    const url = asPath.split('/')
    const groupName = url[url.length - 1].split('%20').join(' ')
 

    
    const [groupsList, setGroupList] = useState([]);
    
    // console.log(JSON.stringify(groupsList) + "lol")
    // isMounted is added to prevent memory leaks
    useEffect(() => {

        let isMounted = true;
        
        async function fetchData() {
            
            await fire.firestore().collection('groups').where("groupName", "==", groupName)
            .orderBy('createdAt', 'desc')
            .onSnapshot(snapshot => {
                if(isMounted){
                    setGroupList(snapshot.docs.map( doc => doc.data()))
                }
            })
        }

        fetchData();

        

        return () => {
            isMounted = false
        }
      });

      
    return (
        <div>
            <Layout>
                <GroupsBanner groupName={groupName} buttonTitle={buttonTitle}/>
              
            </Layout>

            <Container className={classes.page}>
            {
            groupsList.length != 0 ?
            <Grid container spacing={3}>
                {groupsList.map(group => (
                    <Grid key={group.id} item xs={12} md={6} lg={4}>
                        <GroupsCard groups={group}/>
                       
                    </Grid>
                ))}
            </Grid>
            :
            // NEEDS STYLING!!!!
            <Typography textAlign="center"> NOT A MEMBER OF ANY GROUP. CREATE OR JOIN A GROUP NOW. </Typography>
        }
        </Container>
        </div>

        
    );
}

export default Group;

// wrap layout component