import React from 'react';
import CityNameInput from './CityNameInput';
import CountryNameInput from './CountryNameInput';

class UserInput extends React.Component {
  constructor(props){
    super(props);
  }

  render() {

    return (
      <div className="row">
      <div className="col-sm-6" >
        <CityNameInput onGetWeatherData={(name) => this.props.onGetWeatherData(name)}/>
      </div>
      <div className="col-sm-6" >
        <CountryNameInput onGetCountryData={(name) => this.props.onGetCountryData(name)}/>
      </div>
  </div>
    );
  }
}
export default UserInput;