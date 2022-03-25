import Events from "../../components/Dashboard/Events/Events";
import Layout from "../../components/Layout/Layout";
import DashboardLayout from "../../components/Layout/DashboardLayout"

const HomeDashboard = () => {

    return (
        <div>
            <DashboardLayout>
                <Events/>
            </DashboardLayout>
        </div>
    
    );
}

export default HomeDashboard;

// wrap layout component
// list of all the events of the user from all groups they joined