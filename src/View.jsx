import React from 'react';
import displayOptions from './DisplayOptions'

class View extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    let displayOption= this.props.displayOption;
    let picOfDayData = this.props.picOfDayData;
    let view = null;

    if (displayOption === displayOptions.COUNTRY){
      let country = this.props.countryData;

      view = 
        <div>
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td>Country Name</td>
                <td>{country.name}</td>
              </tr>
              <tr>
                <td>Capital</td>
                <td>{country.capital}</td>
              </tr>
              <tr>
                <td>Population</td>
                <td>{country.population}</td>
              </tr>
              <tr>
                <td>Calling code</td>
                <td>{country.callingCodes}</td>
              </tr>
            </tbody>
          </table>
        </div>
    }
    else if (displayOption === displayOptions.WEATHER){
      let weather = this.props.weatherData;
      let temperatureKelvin = parseFloat(weather.main.temp);
      let temperatureFahrenheit = Math.round(((temperatureKelvin-273.15)*(9/5))+32); 

      view = 
        <div>
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td>City Name</td>
                <td>{weather.name}</td>
              </tr>
              <tr>
                <td>Temperature (F)</td>
                <td>{temperatureFahrenheit}</td>
              </tr>
              <tr>
                <td>Humidity</td>
                <td>{weather.main.humidity}</td>
              </tr>
            </tbody>
          </table>
        </div>
    }
    else if (displayOption === displayOptions.PICTURE){
      view = 
        <div> 
        <p id="picOfDayText">Picture of the day</p>
        <img src={picOfDayData.url} alt="Pic of the day" className="rounded" id="picOfDay"/>
        </div>
    }
    else{
      view = 
        <div> 
          <p id="picOfDayText">Picture (video) of the day</p>
          <iframe src={picOfDayData.url} width="1000" height="500" id="picOfDay"/>
        </div>
    }

    return (
      <div><br/>
      {  
        view
      }    
      </div>    
    );
  }
}
export default View;