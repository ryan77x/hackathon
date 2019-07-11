import React from 'react';
import displayOptions from './DisplayOptions'
import Country from './Country';
import Weather from './Weather';
import PicOfDay from './PicOfDay';
import VideoOfDay from './VideoOfDay';

class View extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    let displayOption= this.props.displayOption;
    let view = null;

    switch(displayOption){
      case displayOptions.COUNTRY:  
        view = <Country countryData={this.props.countryData}/>
        break;
      
      case displayOptions.WEATHER:  
        view = <Weather weatherData={this.props.weatherData}/>
        break;
        
      case displayOptions.PICTURE:  
        view = <PicOfDay picOfDayData={this.props.picOfDayData}/>
        break;

      case displayOptions.VIDEO:  
        view = <VideoOfDay videoOfDayData={this.props.picOfDayData}/>
        break;
        
      default:  
        view = <div></div>
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