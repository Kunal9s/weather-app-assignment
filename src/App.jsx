// import { useState } from 'react';
// import './App.css';

// import clear from "./assets/clear.png";
// import clouds from "./assets/clouds.png";
// import drizzle from "./assets/drizzle.png";
// import humidity from "./assets/humidity.png";
// import mist from "./assets/mist.png";
// import rain from "./assets/rain.png";
// import search from "./assets/search.png";
// import wind from "./assets/wind.png";

// function App() {

//   const apiKey = "57073734d878ee3bcd2a9368fd10a486";
//   const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

//   const [city, setCity] = useState("");
//   const [weatherData, setWeatherData] = useState(null);
//   const [icon, setIcon] = useState(clouds);

//   const checkWeather = async () => {

//     if (city === "") return;

//     const response = await fetch(
//       apiUrl + city + `&appid=${apiKey}`
//     );

//     const data = await response.json();

//     if (data.cod === "404") {
//       alert("City not found");
//       return;
//     }

//     setWeatherData(data);

//     if (data.weather[0].main === "Clouds") {
//       setIcon(clouds);
//     }
//     else if (data.weather[0].main === "Clear") {
//       setIcon(clear);
//     }
//     else if (data.weather[0].main === "Rain") {
//       setIcon(rain);
//     }
//     else if (data.weather[0].main === "Drizzle") {
//       setIcon(drizzle);
//     }
//     else if (data.weather[0].main === "Mist") {
//       setIcon(mist);
//     }
//   };

//   return (
//     <div className='card'>
//       <div className='search'>
//         <input 
//           type="text"
//           placeholder="Enter your city name"
//           value={city}
//           onChange={(e) => setCity(e.target.value)}
//           />
//           <button onClick={checkWeather}>
//             <img src={search} alt="search" />
//           </button>
//       </div>

//       {weatherData && (
//         <div className="weather">
//           <img src={icon} alt="icon" className='weather-icon' />
//           <h1 className="temp">
//             {Math.round(weatherData.main.temp)}°c
//           </h1>
//           <h2 className='city'>
//             {weatherData.name}
//           </h2>
//           <div className="details">
//             <div className="col">
//               <img src={humidity} alt="image" />
//               <div>
//                 <p className='humidity'>
//                   {weatherData.main.humidity}%
//                 </p>
//                 <p>Humidity</p>
//               </div>
//             </div>
//             <div className="col">
//               <img src={wind} alt="img" />
//               <div>
//                 <p className='wind'>
//                   {weatherData.wind.speed} km/h
//                 </p>
//                 <p>Wind Speed</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//     </div>
//   )
// };

// export default App;

import { useState } from 'react';
import "./App.css";

import SearchBar from "./components/SearchBar";
import WeatherCard from './components/WeatherCard';
import Forecast from "./components/Forecast";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import Footer from "./components/Footer";

import {
  fetchWeather,
  fetchForecast
} from "./components/services/weatherApi";

function App() {

  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const checkWeather = async () => {

    try {
      if (city === "") {
        setError("Please enter a city");
        return;
      }

      setLoading(true);
      setError("");

      const weather = await fetchWeather(city);

      if (weather.cod === "404") {
        setError("City not found");
        setLoading(false);
        return;
      }

      setWeatherData(weather);

      const forecastData = await fetchForecast(city);

      const dailyForecast = 
        forecastData.list.filter((item) => 
          item.dt_txt.includes("12:00:00")
        );

        setForecast(dailyForecast);

        setLoading(false);

    } catch (error) {
      setError("Something went wrong");
      setLoading(false);
    }
  };

  const getCurrentLocation = () => {

    navigator.geolocation.getCurrentPosition(

      async (position) => {
        try {
          setLoading(true);
          setError("");

          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          const apiKey = import.meta.env.VITE_API_KEY;
          console.log(apiKey);
          
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
          );
            const data = await response.json();

            setWeatherData(data);

           const forecastResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
          );

          const forecastData = await forecastResponse.json();

          const dailyForecast = forecastData.list.filter((item) => 
            item.dt_txt.includes("12:00:00")
          );

          setForecast(dailyForecast);

          setLoading(false);

          } catch (error) {

            setError("Unable to fetch location weather");
            setLoading(false);
          }
        },

          () => {
            setError("Location permission denied"); 
          }
        );
      };
      
      return (
        <div className="app">
          <SearchBar
            city={city}
            setCity={setCity}
            checkWeather={checkWeather} 
            getCurrentLocation={getCurrentLocation}
          />

          {loading && <Loader />}    

          {error && 
            <ErrorMessage error={error} />
          }

          {weatherData && 
            <WeatherCard weatherData={weatherData} />
          }  

          {forecast.length > 0 && 
            <Forecast forecast={forecast} />
          }

          <Footer />

        </div>
      )
    
  };

  export default App;

