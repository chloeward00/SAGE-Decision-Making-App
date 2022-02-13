import { makeStyles } from '@mui/styles';
import { Typography } from '@mui/material';


const title = "SAGE";

const useStyles = makeStyles( theme => ({
    title: {
        color: '#fff',
        fontWeight: 450,
        fontSize: '112px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '76px',
        }
    },
    caption: {
        color: '#FFF',
        fontSize: '20px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '16px',
        }
    },
}))

const LeftGrid = (props) => {

    const { caption } = props;
    const classes = useStyles();

    return (
        <>
            <Typography align="center" className={classes.title}>
                {title}
            </Typography>
            <Typography align="center" className={classes.caption}>
                {caption}
            </Typography>
        </>
    );
}

export default LeftGrid;