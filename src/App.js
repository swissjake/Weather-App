import React, {useState} from "react";
const api = {
  key: "1922b18b35e62c7a68e921cd0ee90a3d",
  base: "https://api.openweathermap.org/data/2.5/"
}



function App() {
  const [query, setQuery] = useState("")
  const [weather, setWeather] = useState({})

const search = (e) =>{
  if(e.key === "Enter"){
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(res => res.json())
    .then(result => {
      setWeather(result);
      setQuery('');
      console.log(result)
    })
  }
}



  const dateBuilder = (e) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August",
     "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", 
    "Friday", "Saturday"];

    let day = days[e.getDay()];
    let date = e.getDate();
    let month = months[e.getMonth()];
    let year = e.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof weather.main != 'undefined') ? ((weather.main.temp > 16) ?'App warm' : 'App') : 'App'}>
      <div className="main">
        <div className="search-box">
          <input 
          type="text" 
          className="search-bar"
          placeholder="Search...."
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyPress={search}
          />
        </div>


        {(typeof weather.main != 'undefined')? (

        <div>
          <div className="location-box">
            <div className="location">
              {weather.name}
            </div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
            {Math.round(weather.main.temp)}°c
              </div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
        ) : ('')}
      </div>
    </div>
  );
}

export default App;
