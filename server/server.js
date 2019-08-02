const express = require('express');
const morgan = require('morgan');
const axios = require('axios');

const rapid_API_key = process.env.rapid_API_key;

const API_country_URL = 'https://restcountries-v1.p.rapidapi.com/name/';
const API_country_host = 'restcountries-v1.p.rapidapi.com';

const API_weather_URL = 'https://community-open-weather-map.p.rapidapi.com/weather?callback=test&id=2172797&units=%22metric%22+or+%22imperial%22&mode=xml%2C+html&q=';
const API_weather_host = 'community-open-weather-map.p.rapidapi.com';

const nasa_API_key = process.env.nasa_API_key;
const API_picOfDay_URL = 'https://api.nasa.gov/planetary/apod?api_key=';

const app = express();

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.static('dist'));

app.get('/api/weather_data', (req, res) => {
    let cityName = req.query.q.trim();

    if (cityName === ''){
        res.status(404).json({"Status": "Input is invalid." });
        console.log("Input is empty space");
    }
    else{
        const config = {
            method: 'get',
            url: API_weather_URL + cityName,
            headers: { 
                'X-RapidAPI-Host': API_weather_host,
                'X-RapidAPI-Key': rapid_API_key
            }
        }

        axios(config)
        .then((response) => {
            //response data from this particular API service needs to be modified before parsing to object
            let data = response.data.replace('test({', '{');
            data = data.replace('})', '}');
            res.status(200).json(data);

        })
        .catch(error => {
            res.status(404).json({"Status": "Unable to query the request data at this time or input is invalid.  Try again later or ensure the input is valid." });
            console.log(error);
        });
    }
});    

app.get('/api/country_data', (req, res) => {
    let countryName = req.query.q.trim();

    if (countryName === ''){
        res.status(404).json({"Status": "Input is invalid." });
        console.log("Input is empty space");
    }
    else{
        const config = {
            method: 'get',
            url: API_country_URL + countryName,
            headers: { 
                'X-RapidAPI-Host': API_country_host,
                'X-RapidAPI-Key': rapid_API_key
            }
        }

        axios(config)
        .then((response) => {
              res.status(200).json(response.data[0]);
        })
        .catch(error => {
            res.status(404).json({"Status": "Unable to query the request data at this time or input is invalid.  Try again later or ensure the input is valid." });
            console.log(error);
        });
    }
});  

app.get('/api/pic_data', (req, res) => {
    let url = API_picOfDay_URL + nasa_API_key;

    axios
    .get(url)
    .then((response) => {
        res.status(200).json(response.data);
    })
    .catch(error => {
        res.status(404).json({"Status": "Unable to query the request data at this time.  Try again later." });
        console.log(error);
    });
});  

module.exports = app;