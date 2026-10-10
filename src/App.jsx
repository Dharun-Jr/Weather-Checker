
import { useState } from "react";

function App() {
  const months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];

  const dateObj = new Date();
  const month = months[dateObj.getMonth()];
  const date = dateObj.getDate();
  const year = dateObj.getFullYear();

  const apiKey = "YOUR_API_KEY";

  const [temp, setTemp] = useState(null);
  const [high, setHigh] = useState(null);
  const [low, setLow] = useState(null);
  const [img, setImg] = useState(null);
  const [desc, setDesc] = useState(null);
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState("");

  async function getWeather() {
    if (!search.trim()) {
      alert("Please enter a city name");
      return;
    }

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(search.trim())}&units=metric&appid=${apiKey}`
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "City not found");
        return;
      }

      setCity(data.name);
      setTemp(Math.round(data.main.temp));
      setHigh(Math.round(data.main.temp_max));
      setLow(Math.round(data.main.temp_min));
      setDesc(data.weather[0].description);
      setImg(
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      );
    } catch (err) {
      alert("Network error. Please try again.");
      console.error(err);
    }
  }

  return (
    <>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by City"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") getWeather();
          }}
        />

        <button className="search-btn" onClick={getWeather}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>

      <div className="date">
        <p>{`${date} ${month} ${year}`}</p>
      </div>

      {city && (
        <div className="city-name">
          <h2>{city}</h2>
        </div>
      )}

      {img && (
        <div className="weather-desc">
          <img src={img} alt="weather-icon" />
          <p>{desc}</p>
        </div>
      )}

      {temp !== null && (
        <div className="temp">
          <h3>{temp}° C</h3>
        </div>
      )}

      {high !== null && low !== null && (
        <div className="extra-info">
          <div className="high">
            <h5>High</h5>
            <p>{high}° C</p>
          </div>

          <div className="low">
            <h5>Low</h5>
            <p>{low}° C</p>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
