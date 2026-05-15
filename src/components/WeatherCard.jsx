import clear from "../assets/clear.png";
import clouds from "../assets/clouds.png";
import drizzle from "../assets/drizzle.png";
import humidity from "../assets/humidity.png";
import mist from "../assets/mist.png";
import rain from "../assets/rain.png";
import wind from "../assets/wind.png";
import snow from "../assets/snow.png";

function WeatherCard({ weatherData }) {

  if (!weatherData || !weatherData.weather) {
    return null;
  }

  const weatherMain = weatherData.weather?.[0]?.main;

  let weatherIcon = clouds;

  if (weatherMain === "Clear") {
    weatherIcon = clear;
  } else if (weatherMain === "Rain") {
    weatherIcon = rain;
  } else if (weatherMain === "Drizzle") {
    weatherIcon = drizzle;
  } else if (weatherMain === "Mist") {
    weatherIcon = mist;
  } else if (weatherMain === "Snow") {
    weatherIcon = snow;
  }

  return (
    <div className="weather-card">
      <img src={weatherIcon} alt="weather" className="weather-icon" />
      <h1>{weatherData.name}</h1>
      <h2>{Math.round(weatherData.main.temp)}°C</h2>
      <p>{weatherData.weather[0].main}</p>
      <div className="details">
        <div className="col">
          <img src={humidity} alt="humidity" />

          <div>
            <p className="humidity">{weatherData.main.humidity}%</p>
            <p>Humidity</p>
          </div>
        </div>
        <div className="col">
          <img src={wind} alt={wind} />
          <div>
            <p className="wind">{weatherData.wind.speed} km/h</p>
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
      <p>
        Feels Like:
        {weatherData.main.feels_like}°C
      </p>
    </div>
  );
}

export default WeatherCard;
