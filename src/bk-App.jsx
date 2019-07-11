import React, { Component } from 'react';
import axios from 'axios';
import View from './View'
import displayOptions from './DisplayOptions'

const rapid_API_key = '37d1b8beffmsh185156cb29e8172p139f14jsn87a5bed0c0d2';

const API_country_URL = 'https://restcountries-v1.p.rapidapi.com/name/';
const API_country_host = 'restcountries-v1.p.rapidapi.com';

const API_weather_URL = 'https://community-open-weather-map.p.rapidapi.com/weather?callback=test&id=2172797&units=%22metric%22+or+%22imperial%22&mode=xml%2C+html&q=';
const API_weather_host = 'community-open-weather-map.p.rapidapi.com';

const nasa_API_key = 'HP1lr8fnPFNwZflvq5WzERHCFAMqTfTGNDpapjzt';
const API_picOfDay_URL = 'https://api.nasa.gov/planetary/apod?api_key=';
const default_picOfDay_data = { url: 'image/wave.jpg' };

class App extends Component{
    constructor(){
        super();
        this.state = {
            countryName: '',
            countryData: [],
            picOfDayData: {},
            cityName: '',
            weatherData: [],
            displayOption: null
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCountryInfoClick = this.handleCountryInfoClick.bind(this);
        this.handleWeatherInfoClick = this.handleWeatherInfoClick.bind(this);
    }

    handleInputChange(event){
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value
        });
    }

    handleAllCountriesClick(){
        this.setState({
            displayOption: displayOptions.COUNTRIES
        });
    }

    handleCountryInfoClick(event){
        let countryName = this.state.countryName.trim();

        if (countryName === ''){
            console.log("User input is empty space");
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
            .then((res => this.setState(
            {
                countryData: res.data[0],
                displayOption: displayOptions.COUNTRY
            }  
            )))
            .catch(error => {
                console.log(error);
            });
        }
    }

    handleWeatherInfoClick(event){
        let cityName = this.state.cityName.trim();

        if (cityName === ''){
            console.log("User input is empty space");
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
            .then((res) => {
                //response data from this particular API service needs to be modified before parsing to object
                let data = res.data.replace('test({', '{');
                data = data.replace('})', '}');
                data = JSON.parse(data);

                this.setState(
                {
                    weatherData: data,
                    displayOption: displayOptions.WEATHER
                }  
                );
            })
            .catch(error => {
                console.log(error);
            });
        }
    }
 
    componentDidMount(){
        const config = {
            method: 'get',
            url: API_picOfDay_URL + nasa_API_key
        }

        axios(config)
        .then((res) => {
            let data = res.data;
            let displayOption = null;

            if (data.media_type === "video"){
                displayOption = displayOptions.VIDEO;
            }
            else{
                displayOption = displayOptions.PICTURE;
            }

            this.setState(
            {
                picOfDayData: data,
                displayOption: displayOption
            }  
            );
        })
        .catch(error => {
            console.log(error);

            this.setState(
                {
                    picOfDayData: default_picOfDay_data,
                    displayOption: displayOptions.PICTURE
                }  
            );
        });
    }

    render() {
        const hrStyle = {
            'borderColor': 'white',
        };

        return (
          <div className='container'>
            <h1 className="text-white">React and web API (Hackathon)</h1>
            <hr style={hrStyle}/>
            
            <div className="row">
                <div className="col-sm-6" >
                    <div className="card">
                        <div className="card-header">
                            <p>Get basic weather info</p>
                        </div>
                        <div className="card-body">
                        <div>
                            <label><strong>City Name</strong></label>
                            <input className="form-control" id="cityName"
                            name="cityName" 
                            type="text" 
                            value={this.state.cityName}
                            onChange={this.handleInputChange}
                            />
                        </div>
                        </div>
                        <div className="card-footer">
                        <button className="btn btn-primary" name="cityTemperatureButton" onClick={this.handleWeatherInfoClick}>City Temperature</button>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6" >
                    <div className="card">
                        <div className="card-header">
                            <p>Get basic country info</p>
                        </div>
                        <div className="card-body">
                        <div>
                            <label><strong>Country Name</strong></label>
                            <input className="form-control" id="countryName"
                            name="countryName" 
                            type="text" 
                            value={this.state.countryName}
                            onChange={this.handleInputChange}
                            />
                        </div>
                        </div>
                        <div className="card-footer">
                        <button className="btn btn-primary" name="countryInfoButton" onClick={this.handleCountryInfoClick}>Country Info</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <View 
                displayOption={this.state.displayOption}
                countryData={this.state.countryData} 
                weatherData={this.state.weatherData}
                picOfDayData={this.state.picOfDayData}
            />
          </div>
        );
    }
}

export default App;