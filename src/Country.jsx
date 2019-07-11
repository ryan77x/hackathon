import React from 'react';

export default (props) => {
    let country = props.countryData;

    return <div>
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

