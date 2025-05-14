import { useState } from 'react'
import './App.css'

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) =>{
    setCity(e.target.value);
  };

  const API_KEY = 'd7ed373fe6c2a56c1d38215a5e804688'

 const getWeather = () =>{
  if (!city) return;



  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
  .then(res =>{
    if (!res.ok) {
      throw new Error("City not found");
    }
    return res.json();
  })
  .then(data =>{
    setWeather(data);
    setError(null);
  })
  
  .catch(err =>{
    setWeather(null);
    setError(err.message);
  });
 };
  


  return (
    <>
      <div className='App'>
        <h1>Weather App</h1>

        <input
        type='text'
        placeholder='Enter city name here'
        value = {city}
        onChange={handleInputChange}
        />

        <button onClick={getWeather}>Get Weather</button>

        {error && <p style={{color: 'red'}}>{error}</p>}

        {weather &&(
          <div className='weather-card'>
            <h2>City: {weather.name}, {weather.sys.country}</h2>
            <p> Weather Description: {weather.weather[0].description}</p>
            <p>Temperature: {weather.main.temp} °C</p>
            <p>Humidity: {weather.main.humidity}%</p>
          </div>
        )}

        <p>You searched for: {city}</p>
      </div>
    </>
  )
}

export default App
