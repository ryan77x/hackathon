import React, { Component } from 'react';
import axios from 'axios';
import View from './View'
import displayOptions from './DisplayOptions'

class App extends Component{
    constructor(){
        super();
        this.state = {
            countryName: null,
            country: [],
            countries: [],
            stockPrice: [],
            cityName: null,
            weather: [],
            displayOption: null
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleAllCountriesClick = this.handleAllCountriesClick.bind(this);
        this.handleCountryInfoClick = this.handleCountryInfoClick.bind(this);
        this.handleStockInfoClick = this.handleStockInfoClick.bind(this);
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
        const config = {
            method: 'get',
            url: 'https://restcountries-v1.p.rapidapi.com/name/' + this.state.countryName,
            headers: { 
                'X-RapidAPI-Host': 'restcountries-v1.p.rapidapi.com',
                'X-RapidAPI-Key': '37d1b8beffmsh185156cb29e8172p139f14jsn87a5bed0c0d2'
            }
        }

        axios(config)
        .then((res => this.setState(
          {
            country: res.data[0],
            displayOption: displayOptions.COUNTRY
          }  
        )));
    }

    handleWeatherInfoClick(event){
        const config = {
            method: 'get',
            url: 'https://community-open-weather-map.p.rapidapi.com/weather?callback=test&id=2172797&units=%22metric%22+or+%22imperial%22&mode=xml%2C+html&q=' + this.state.cityName,
            headers: { 
                'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
                'X-RapidAPI-Key': '37d1b8beffmsh185156cb29e8172p139f14jsn87a5bed0c0d2'
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
                weather: data,
                displayOption: displayOptions.WEATHER
            }  
            );
        });
    }

    handleStockInfoClick(event){
        const config = {
            method: 'get',
            url: 'https://myallies-breaking-news-v1.p.rapidapi.com/GetCompanyDetailsBySymbol?symbol=twtr',
            headers: { 
                'X-RapidAPI-Host': 'myallies-breaking-news-v1.p.rapidapi.com',
                'X-RapidAPI-Key': '37d1b8beffmsh185156cb29e8172p139f14jsn87a5bed0c0d2'
            }
        }

        axios(config)
        .then((res => this.setState(
          {
            stockPrice: res.data,
            displayOption: displayOptions.STOCK_PRICE
          }  
        )));
    }
 
    componentDidMount(){

    }

    render() {
        const hrStyle = {
            'borderColor': 'white',
        };

        return (
          <div className='container'>
            <h1 className="text-white">Country Info</h1>
            <hr style={hrStyle}/>
            
            <div className="row">
                <div className="col-sm-6" >
                    <div className="card">
                        <div className="card-header">
                            <p>Get temperature of a city<br/>Example: "san diego, us"</p>
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
                            <p>Get basic country info<br/>Example: "mexico"</p>
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
                country={this.state.country} 
                countries={this.state.countries}
                weather={this.state.weather}
                stockPrice={this.state.stockPrice}
            />
          </div>
        );
    }
}

export default App;