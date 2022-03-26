import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';


const gradient3 = "#4568DC"; // rgba(69 , 104, 220, 1)
const gradient4 = "#B06AB3"; // rgba(176 , 106, 179, 1)

const useStyles = makeStyles((theme) => ({
    card: {
        maxWidth: '100%',
        backgroundColor: '#86A5D1'
    },
    media: {
        height: 250,
    },
    title: {
        fontWeight: 600,
        color: '#FFF'
    }
}))

export default function CardComponent(props) {

    const classes = useStyles();

    const {imageURL, title, caption, alt} = props;

    return (
        <Card className={classes.card}>
            <CardMedia
                component="img"
                height="140"
                image={imageURL}
                alt={alt}
                className={classes.media}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" align="center" className={classes.title}>
                    {title}
                </Typography>
                <Typography variant="body2" color="#fff" align="center">
                    {caption}
                </Typography>
            </CardContent>
        </Card>
  );
}