// pages/index.js
import React from 'react';
import Weather from '../components/Weather.js';


const Home = () => {
  return (
    <div>
      <h1>Weather Dashboard</h1>
      <Weather />
    </div>
  );
};

export default Home;
