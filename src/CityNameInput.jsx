import React, { Component } from 'react';

class CityNameInput extends Component{
    constructor(props){
        super(props);
        this.state = {
            cityName: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    handleInputChange(event){
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value
        });
    }

    handleButtonClick(){
        this.props.onGetWeatherData(this.state.cityName);
    }

    render(){
        return (
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
                    <button className="btn btn-primary" name="cityTemperatureButton" onClick={this.handleButtonClick}>City Temperature</button>
                </div>
            </div>
        );
    }
}
export default CityNameInput;