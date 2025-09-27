// components/Weather.js
import React, { useState } from 'react';
import axios from 'axios';
import { FaCloud, FaSun, FaRain, FaSnowflake } from 'react-icons/fa';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = 'f90d4cd1abb8aa210955269914ac911c'; // Replace with your actual API key

  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(res.data);
      setError(null); // Reset error state on successful fetch
    } catch (err) {
      setError('City not found or API error');
      setWeatherData(null);
    }
  };

  return (
    <div className="weather-container">
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {error && <div className="error">{error}</div>}

      {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.name}</h2>
          <p>{weatherData.weather[0].description}</p>
          <div>
            <span>{weatherData.main.temp}°C</span>
            {weatherData.weather[0].main === 'Clear' && <FaSun />}
            {weatherData.weather[0].main === 'Clouds' && <FaCloud />}
            {weatherData.weather[0].main === 'Rain' && <FaRain />}
            {weatherData.weather[0].main === 'Snow' && <FaSnowflake />}
          </div>
          <div>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
