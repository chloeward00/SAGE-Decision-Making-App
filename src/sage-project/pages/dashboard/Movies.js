import { Layout,Card,Form, Input, Button, Checkbox,message } from 'antd';
import Head from "next/head";
import { DeleteOutlined, KeyOutlined } from "@ant-design/icons";
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import firebase from "../../firebase/firebase";
import { React, useEffect, useState } from 'react';
import * as fireb from 'firebase'
import Router from "next/router";
import MovieList from '../../components/MovieList';
import { Container, Row, Col } from 'react-bootstrap';

import Movie from '../../components/Movie';


// {"genres":[{"id":28,"name":"Action"},{"id":12,"name":"Adventure"},{"id":16,"name":"Animation"},
// {"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},
// {"id":18,"name":"Drama"},{"id":10751,"name":"Family"},{"id":14,"name":"Fantasy"},{"id":36,"name":"History"},{"id":27,"name":"Horror"},{"id":10402,"name":"Music"},{"id":9648,

// "name":"Mystery"},{"id":10749,"name":"Romance"},{"id":878,"name":"Science Fiction"},
// {"id":10770,"name":"TV Movie"},{"id":53,"name":"Thriller"},{"id":10752,"name":"War"},{"id":37,"name":"Western"}]}

// When we do the user survey we'll take the most voted film genre in and input it into the link
const action = 28;
const Adventure = 12;
const Animation = 16;
const Comedy = 35;
const Crime = 80;
const Documentary = 99;
const Drama = 18;
const Family = 10751;
const Fantasy = 14;
const History = 36;
const Horror = 27;
const Music = 10402;
const Drama = 18;
const TvMovie = 10770;
const Thriller = 53;
const War = 10752;
const Western = 37;
const Mystery = 9648;
const Romance = 10749;
const ScienceFiction = 878;

const genre_API = "https://api.themoviedb.org/3/discover/movie?api_key=637ebc34a12fc235b39c60d6e3889d59&language=en-US&sort_by=popularity.desc&include_adult=false&with_genres="
function App() {

    const [movies, setMovies] = useState([]);

    useEffect(() => {

        fetch(genre_API + Romance)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setMovies(data.results);
        });

    }, [])

    return ( <div>
            {movies.length > 0 && movies.map((movie) => 
            <Movie key={movie.id} {...movie} />)}
    </div>
    );

}

   

export default App;