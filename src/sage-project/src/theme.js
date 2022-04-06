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
        rose: '#EE96B5',
        lightBlue: '#86A8E7',
        lightPurple: '#7F7FD5',
        gradient1: '#7F7FD5',
        gradient2: '#86A8E7'
    },
    text: {
        purple: '#410179',
        gray: '#8E8E8E',
        darkGray: '#555555',
    }
});

export default theme;