import React from 'react';

export default (props) => {
    let picOfDayData = props.picOfDayData;

    return <div>
        <p id="picOfDayText">Picture of the day</p>
        <img src={picOfDayData.url} alt="Pic of the day" className="rounded" id="picOfDay"/>
        </div>
}

