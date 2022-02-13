import React from "react";
import "./weather.style.css";

//this component covers the degrees and information shown/returns after entering data into the form


const Weather = props => {
  return (
    <div className="container text-light">
      <div className="Card">
        <h1 className="text-white py-3">{props.cityname}</h1>
        <h5 className="py-4">
          <i className={`wi ${props.weatherIcon} display-1`} />
        </h5>

        {/* Get Celsius 
        
        &degree adds temperture symbol
        
        */}
        {props.temp_celsius ? (
          <h1 className="py-2">{props.temp_celsius}&deg;</h1>//if true show degrees and degree sign if not nothing 
        ) : null}

        {/* show max and min temp */}
        {maxminTemp(props.temp_min, props.temp_max)}

        {/* Weather description 
        
        
        
        */}
        <h4 className="py-3">
          {props.description.charAt(0).toUpperCase() +
            props.description.slice(1)}
        </h4>
      </div>
    </div>
  );
};

export default Weather;

function maxminTemp(min, max) {
  if (max && min) {
    return (
      <h3>
        <span className="px-4">{min}&deg;</span>
        <span className="px-4">{max}&deg;</span>
      </h3>
    );
  }
}
