

function App() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let dateObj = new Date();
  let month = months[dateObj.getMonth()];
  let date = dateObj.getDate();
  let year = dateObj.getFullYear();
  const apiKey = "6bc6228388e7ccf8b00cc320b2a563a6";

  let [temp, setTemp] = useState(null);
  let [high, setHigh] = useState(null);
  let [low, setLow] = useState(null);
  let [img, setImg] = useState(null);
  let [desc, setDesc] = useState(null);
  let [city, setCity] = useState(null);
  let [search, setSearch] = useState("");

  async function getWeather() {
    if (!search) return;

    try {
      let res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${apiKey}`
      );
      let data = await res.json();

      if (data.cod !== 200) {
        alert("City not found");
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
      alert("Something went wrong");
    }
  }

  return (
    <>
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by City"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown = {(e) =>{if(e.key === "Enter") getWeather();}}
        />
        <button className="search-btn" onClick={getWeather}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>

      {/* Date, Month and Year */}
      <div className="date">
        <p>{`${date} ${month} ${year}`}</p>
      </div>

      {/* City Name */}
      {city && (
        <div className="city-name">
          <h2>{city}</h2>
        </div>
      )}

      {/* Weather Description */}
      {img && (
        <div className="weather-desc">
          <img src={img} alt="weather-icon" />
          <p>{desc}</p>
        </div>
      )}
      {/* Temperature */}
      {temp !== null && (
        <div className="temp">
          <h3>{temp}° C</h3>
        </div>
      )}

      {/* High / Low */}
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
