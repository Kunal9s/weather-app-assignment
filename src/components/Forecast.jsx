import ForestCard from "./ForestCard";

function Forecast({ forecast }) {
  return (
    <div className="forecast-container">
      {forecast.map((item) => (
        <ForestCard key={item.dt} item={item} />
      ))}
    </div>
  );
}

export default Forecast;
