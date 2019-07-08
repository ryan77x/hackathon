import React, { Component } from 'react';
import axios from 'axios';
import CountryView from './CountryView'

class App extends Component{
    constructor(){
        super();
        this.state = {
            countryName: 'test name',
            country: [],
            countries: [],
            displayCountryDetail: true,
        }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAllCountriesClick = this.handleAllCountriesClick.bind(this);
    this.handleCountryInfoClick = this.handleCountryInfoClick.bind(this);
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
            displayCountryDetail: false
        });
    }

    handleCountryInfoClick(event){
        this.setState({
            displayCountryDetail: true
        });
        //event.preventDefault();
    }
 
    componentDidMount(){
        const config = {
            method: 'get',
            url: 'https://restcountries-v1.p.rapidapi.com/name/china',
            headers: { 
                'X-RapidAPI-Host': 'restcountries-v1.p.rapidapi.com',
                'X-RapidAPI-Key': '37d1b8beffmsh185156cb29e8172p139f14jsn87a5bed0c0d2'
            }
        }

        axios(config)
        .then((res => this.setState(
          {
            country: res.data[0]
          }  
        )));
    }

    render() {
        const hrStyle = {
            'borderColor': 'white',
        };

        return (
          <div className='container'>
            <h1 className="text-white">Country Info</h1>
            <hr style={hrStyle}/>
            
            <div className="card">
                <div className="card-header">
                    <button className="btn btn-primary" name="AllCountries" onClick={this.handleAllCountriesClick}>All Countries</button>
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
            
            <CountryView 
                displayCountryDetail={this.state.displayCountryDetail}
                country={this.state.country} 
                countries={this.state.countries}
            />
          </div>
        );
    }
}

export default App;