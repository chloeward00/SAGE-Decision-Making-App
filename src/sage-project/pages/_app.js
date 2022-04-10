import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme from '../src/theme';
import createEmotionCache from '../src/createEmotionCache';
import "../styles/style.scss";
import "../styles/component.module.css";
import { useState, useEffect } from "react";
import firebase from "../firebase/firebase";
import { Spin } from "antd";
import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
    const [firebaseInitialized, setFirebaseInitialized] = useState(false);

    useEffect(() => {
        async function fetchData() {
          
          await firebase.isInitialized();
          setFirebaseInitialized(true);
         
        }
        fetchData();
      }, []); // Or [] if effect doesn't need props or state
    return (
    <>
        {!firebaseInitialized ? (
            <div className="fullscreenflexmiddle">
                <Spin />
            </div>
        ) : (
            <CacheProvider value={emotionCache}>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <Component {...pageProps} />
            </ThemeProvider>
            </CacheProvider>
        )}
    </>
    );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
