import React from 'react';

export default (props) => {
    let videoOfDayData = props.videoOfDayData;

    return <div>
                <p id="picOfDayText">Picture (or video) of the day</p>
                <iframe src={videoOfDayData.url} width="1000" height="500" id="picOfDay"/>
                <p>{videoOfDayData.explanation}</p>
        </div>
}

