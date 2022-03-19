import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
    palette: {
        primary: {
            main: '#556cd6',
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: red.A400,
        },
    },
    colours: {
        blue: '#96E9EE',
        purple: '#9896EE',
        pink: '#D796EE',
        rose: '#EE96B5'
    },
    text: {
        purple: '#410179',
        gray: '#8E8E8E',
        darkGray: '#555555',
    }
});

export default theme;