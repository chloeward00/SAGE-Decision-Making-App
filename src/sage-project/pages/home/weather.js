import Events from "../../components/Dashboard/Events/Events";
import Layout from "../../components/Layout/Layout";
import DashboardLayout from "../../components/Layout/DashboardLayout"
import React, {useState,useEffect } from "react";
import axios from "axios";

const Weather = () => {

  const [latitude, setLatitude] = useState()
  const [longitude, setLongitude] = useState()
  const [weather, setWeather] = useState('');
  const [city, setCity] = useState('');


  useEffect(() => {
    let mounted = false
   
    if(!mounted){
        weatherType2();
       }
           
    return () => {
       mounted = true
      }
       
   }, [])



console.log(latitude)
console.log(weather, "testing")


    const weatherType2 = () => {


        let long;
        let lat;
    
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                long = position.coords.longitude;
                lat = position.coords.latitude;
    
                console.log(position)
                var date = Math.round((new Date()).getTime()); // open weather api needs unix online it said to also divide by 1000 but it works fine without it?
    
                const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&date=${date}&appid=a91e29b30e54923f38922f42dcf1256d`;
    
                fetch(api)
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        console.log(data);
                       

                        setWeather({
                            descp: data.weather[0].description,
                            temp: data.main.temp - 273.15, // converting to celcius
                            city: data.name,
                            humidity: data.main.humidity,
                            press: data.main.pressure,
                        })
                    });
            });
        }
    
    }
// weather contains all the data so to call it do weather.temp etc
console.log(weather)
    return (
      <p>hi</p>
    
    );
}

export default Weather;

// wrap layout component