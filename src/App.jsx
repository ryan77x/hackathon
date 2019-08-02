import React, { Component } from 'react';
import axios from 'axios';
import View from './View'
import UserIput from './UserInput'
import displayOptions from './DisplayOptions'

const default_picOfDay_data = { url: 'image/wave.jpg', explanation: '' };

class App extends Component{
    constructor(){
        super();
        this.state = {
            countryData: [],
            picOfDayData: {},
            weatherData: [],
            displayOption: null
        }
    }

    getCountryData(name){
        let countryName = name.trim();

        if (countryName === ''){
            console.log("User input is empty space");
        }
        else{
            let url = '/api/country_data/?q=' + countryName;

            axios
            .get(url)
            .then((res => this.setState(
            {
                countryData: res.data,
                displayOption: displayOptions.COUNTRY
            }  
            )))
            .catch(error => {
                console.log(error);
            });
        }
    }

    getWeatherData(name){
        let cityName = name.trim();

        if (cityName === ''){
            console.log("User input is empty space");
        }
        else{
            let url = '/api/weather_data/?q=' + cityName;

            axios
            .get(url)
            .then((res) => {
                let data = JSON.parse(res.data);

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
        let url = '/api/pic_data';

        axios
        .get(url)
        .then((res) => {
            let data = res.data;
            let displayOption = null;

            if (data.media_type === "video"){
                displayOption = displayOptions.VIDEO;
            }
            else if (data.media_type === "image"){
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
            
            <UserIput 
                onGetCountryData={(name) => this.getCountryData(name)}
                onGetWeatherData={(name) => this.getWeatherData(name)}
            />
            
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