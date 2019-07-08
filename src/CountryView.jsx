import React from 'react';

class CountryView extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    let colorList = ['success', 'secondary', 'info', 'warning', 'danger', 'primary', 'dark', 'light'];
    let i = -1;
    let color = "";
    let displayCountryDetail = this.props.displayCountryDetail;
    let country = this.props.country;
    let countries = this.props.countries;
    let countryView = null;

    if (displayCountryDetail){
      countryView = 
        <div>
          <p>Country Name: {country.name}</p>
          <p>Capital: {country.capital}</p>
          <p>Population: {country.population}</p>
          <p>Calling code: {country.callingCodes}</p>
        </div>

    }
    else{
      countryView = countries.map((item) => {
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
    return (
      <div className="card">
        <div className="card-header">TBD</div>
          <ul className="list-group">
            {  
              countryView
            }        
          </ul>
      </div>
    );
  }
}
export default CountryView;