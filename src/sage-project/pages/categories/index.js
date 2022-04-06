
// import ResponsiveDrawer from "../../components/Dashboard/Drawer/SideDrawer";
import CategoriesCards from '../../components/Categories/CategoriesPage'
import { useBusinessSearch } from '../../hooks/yelp-api/useBusinessSearch'
import DashboardLayout from "../../components/Layout/DashboardLayout"

// const categories = "sports"
// const location = "us"

const Categories = () => {

    // const searchParams = {categories, location};

    const [businesses, amountResults, searchParams, setSearchParams] = useBusinessSearch()
    // const fetchData = async () => {
    //     try {
    //         const rawData = await api.get('/businesses/search', searchParams);
    //         const resp = await rawData.json();
    //         return resp.businesses
    //         // setBusinesses(resp.businesses);
    //         // setAmountResults(resp.total);
    //     } catch(e) {
    //         console.error(e);
    //     }
    // };

    const bus = businesses.map((busi) => busi.name)

    console.log(bus)

    // const [businesses, setBusinesses] = useState([]);
    // const [amountResults, setAmountResults] = useState();
    // const [searchParams, setSearchParams] = useState({categories, location});

    // useEffect(() => {

    //     setBusinesses([]);

    //     const fetchData = async () => {
    //         try {
    //             const rawData = await api.get('/businesses/search', searchParams);
    //             const resp = await rawData.json();
    //             setBusinesses(resp.businesses);
    //             setAmountResults(resp.total);
    //         } catch(e) {
    //             console.error(e);
    //         }
    //     };

    //     fetchData();
        
    // }, [searchParams]);

    // console.log(amountResults)

    return (  
        <div>
            <CategoriesCards/>
        </div>
    );
}
 
export default Categories;

// this will be a modal