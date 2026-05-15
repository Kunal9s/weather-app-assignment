import search from "../assets/search.png";

function SearchBar({ city, setCity, checkWeather, getCurrentLocation }) {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            checkWeather();
          }
        }}
      />

      <button onClick={checkWeather}>
        <img src={search} alt="search" />
      </button>
      <button onClick={getCurrentLocation}>Current Location</button>
    </div>
  );
}

export default SearchBar;
