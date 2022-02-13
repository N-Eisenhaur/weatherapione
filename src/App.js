import React from "react";
import "./App.css";
import Form from "./app_component/form.component";
import Weather from "./app_component/weather.component";
import "bootstrap/dist/css/bootstrap.min.css";

// git project https://github.com/erikflowers/weather-icons
import "weather-icons/css/weather-icons.css";

/*key gets past security sources by adding &appid=${Api_Key} at the end of link    

`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_Key}`

*/
const Api_Key = "429736441cf3572838aa10530929f7cd";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: undefined,//
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: null,
      temp_min: null,
      description: "",
      error: false
    };

    this.weatherIcon = {//wi is a hard coded class
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    };
  }

  get_WeatherIcon(icons, rangeId) {//gets id for icon between two numbers
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
        this.setState({ icon: icons.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: icons.Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 521:
        this.setState({ icon: icons.Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: icons.Snow });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon: icons.Atmosphere });
        break;
      case rangeId === 800:
        this.setState({ icon: icons.Clear });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon: icons.Clouds });
        break;
      default:
        this.setState({ icon: icons.Clouds });
    }
  }

  /*0 degrees Celsius is equal to 273.15 Kelvins. The basic formula is °C + 273.15 = K. Kelvin to Celsius: Add 273. */


  calCelsius(temp) {//changes kelvin to celius with calculation 
    let cell = Math.floor(temp - 273.15);
    return cell;
  }

  getWeather = async e => {//asynchronous event
    e.preventDefault();//prevents getweather button function default behaviour

    const country = e.target.elements.country.value;
    const city = e.target.elements.city.value;

    /*The await expression causes async function execution to pause until a Promise is settled (that is, fulfilled or rejected),
    
    The global fetch() method starts the process of fetching a resource from the network, 
    returning a promise which is fulfilled once the response is available. 
    
    */

    if (country && city) {
      const api_call = await fetch(//specifies city and country functions and draws info from api server based on whats entered in the form
        `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_Key}`
      );

      const response = await api_call.json();

      this.setState({
        city: `${response.name}, ${response.sys.country}`,//name is name of city or relavent box? 
        country: response.sys.country,//country name from sys property after typing city and country?
        main: response.weather[0].main,
        celsius: this.calCelsius(response.main.temp),
        temp_max: this.calCelsius(response.main.temp_max),
        temp_min: this.calCelsius(response.main.temp_min),
        description: response.weather[0].description,
        error: false
      });

      // seting icons
      this.get_WeatherIcon(this.weatherIcon, response.weather[0].id);

      console.log(response);
    }
    
    else {
      this.setState({//error class made in form.component.jsx?
        error: true
      });
    }
  };

  render() {
    return (
      <div className="App">
        <Form loadweather={this.getWeather} error={this.state.error} />
        <Weather
          cityname={this.state.city}
          weatherIcon={this.state.icon}
          temp_celsius={this.state.celsius}
          temp_max={this.state.temp_max}
          temp_min={this.state.temp_min}
          description={this.state.description}
        />
      </div>
    );
  }
}

export default App;

