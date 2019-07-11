import React from 'react';

export default (props) => {
    let weather = props.weatherData;
    let temperatureKelvin = parseFloat(weather.main.temp);
    let temperatureFahrenheit = Math.round(((temperatureKelvin-273.15)*(9/5))+32); 

    return <div>
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

