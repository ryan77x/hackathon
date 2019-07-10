import React from 'react';
import displayOptions from './DisplayOptions'

class View extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    let colorList = ['success', 'secondary', 'info', 'warning', 'danger', 'primary', 'dark', 'light'];
    let i = -1;
    let color = "";
    let displayOption= this.props.displayOption;
    let view = null;

    if (displayOption === displayOptions.COUNTRY){
      let country = this.props.country;

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
    else if (displayOption === displayOptions.COUNTRIES){
      let countries = this.props.countries;

      view = countries.map((item) => {
        if (i == colorList.length-1){
          i = 0;
        }
        else{ 
          i++;
        }

        color = "list-group-item list-group-item-" + colorList[i];
        
        return <li className={color} key={item.id}> 

        </li>
      }); 
    }
    else if (displayOption === displayOptions.WEATHER){
      let weather = this.props.weather;
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
    else{
      view = 
        <div> 
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