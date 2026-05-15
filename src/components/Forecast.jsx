// import ForestCard from "./ForestCard";

// function Forecast({ forecast }) {
//   return (
//     <div className="forecast-container">
//       {forecast.map((item) => (
//         <ForestCard key={item.dt} item={item} />
//       ))}
//     </div>
//   );
// }

// export default Forecast;

function Forecast({ forecast }) {
  return (
    <div className="forecast-container">
      {forecast.slice(0, 5).map((item, index) => (
        <div className="forecast-card" key={index}>
          <h3>
            {new Date(item.dt_txt).toLocaleDateString()}
          </h3>

          <h2>
            {Math.round(item.main.temp)}°C
          </h2>

          <p>{item.weather[0].main}</p>
        </div>
      ))}
    </div>
  );
}

export default Forecast;
