
// import landing_1 from '../public/background_images/landing_1.jpg'
import Image from 'next/image'
import { Paper, TextField, Typography, Grid, Button, Divider} from '@mui/material';


const Banner = () => {
    return (  
        <>
            <Image src='/background_images/landing_1.jpg' layout='fill' alt='banner-1'/>
            <Typography variant="h1" component="h2">
            h1. Heading
            </Typography>;

        </>
    );
}
 
export default Banner;