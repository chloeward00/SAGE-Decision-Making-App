import Events from "../../components/Dashboard/Events/Events";
import Layout from "../../components/Layout/Layout";
import DashboardLayout from "../../components/Layout/DashboardLayout"
import { useEffect, useState } from 'react';
import 'firebase/firestore';
import fire from 'firebase/app';
import * as firebase from 'firebase/app'

const HomeDashboard = () => {

    const [userGroups, setUserGroups] = useState([])

    return (
        <div>
            <DashboardLayout>
                
            </DashboardLayout>
        </div>
    
    );
}

export default HomeDashboard;

// wrap layout component
// list of all the events of the user from all groups they joined