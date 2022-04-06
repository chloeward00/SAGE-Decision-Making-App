import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import Link from '../Link/Link';

const gradient3 = "#4568DC"; // rgba(69 , 104, 220, 1)
const gradient4 = "#B06AB3"; // rgba(176 , 106, 179, 1)

const useStyles = makeStyles((theme) => ({
    card: {
        // maxWidth: '100%',
        backgroundColor: '#86A5D1',
        height: 150,
    },
    media: {
        height: 100,
    },
    title: {
        fontWeight: 600,
        color: '#FFF'
    },
    content: {
        height: 150,
    }
}))

export default function DialogCards(props) {

    const classes = useStyles();

    const {imageURL, title, alt, link} = props;

    return (
        <Link href={link} underline="none">
            <Card className={classes.card}>
                <CardMedia
                    component="img"
                    height="140"
                    image={imageURL}
                    alt={alt}
                    className={classes.media}
                />
                <CardContent className={classes.content}>
                    <Typography component="div" align="center" className={classes.title}>
                        {title}
                    </Typography>
                </CardContent>
            </Card>
        </Link>
  );
}