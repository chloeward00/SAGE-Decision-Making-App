import Events from "../../components/Dashboard/Events/Events";
import Layout from "../../components/Layout/Layout";
import DashboardLayout from "../../components/Layout/DashboardLayout"
import ReactWeather, { useOpenWeather } from 'react-open-weather';
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



// const weatherType = async () => {

//     let lat;
//     let long;

//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(position => {
//             long = position.coords.longitude;
//             lat = position.coords.latitude;

        
//    // getTime() returns milliseconds from the UNIX epoch, so divide it by 1000 to get the seconds representation. It is rounded using Math.round() to make it a whole number. The "ts" variable now has the UNIX timestamp for the current date and time relevent to the user’s web browser.
    
//     var date = Math.round((new Date()).getTime()); // open weather api needs unix

//     const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&date=${date}&appid=a91e29b30e54923f38922f42dcf1256d`
//     const req = await axios.get(url);
//     console.log(req.data, "boyos")

//     setWeather({
//         descp: req.data.weather[0].description,
//         temp: req.data.main.temp - 273.15, // converting to celcius
//         city: req.data.name,
//         humidity: req.data.main.humidity,
//         press: req.data.main.pressure,
//     })
        
// });
// }
//     }}

    const weatherType2 = () => {


        let long;
        let lat;
    
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                long = position.coords.longitude;
                lat = position.coords.latitude;
    
                console.log(position)
                var date = Math.round((new Date()).getTime()); // open weather api needs unix
    
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

console.log(weather)
    return (
      <p>hi</p>
    
    );
}

export default Weather;

// wrap layout component
// list of all the events of the user from all groups they joined