import React, { Component } from 'react';

class CountryNameInput extends Component{
    constructor(props){
        super(props);
        this.state = {
            countryName: ''
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
        this.props.onGetCountryData(this.state.countryName);
    }

    render(){
        return (
            <div className="card">
            <div className="card-header">
                <p>Get basic country info</p>
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
                <button className="btn btn-primary" name="countryInfoButton" onClick={this.handleButtonClick}>Country Info</button>
            </div>
        </div>
        );
    }
}
export default CountryNameInput;