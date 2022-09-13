import { React, useState } from "react";
import weatherCall from "./api/weatherCall";

function App() {

  const [weatherData, setWeatherData] = useState({});
  const [measurementSystem, setMeasurementSystem] = useState("metric");
  const weatherClass = new weatherCall(measurementSystem);

  const handleAPICall = (e) => {
    e.preventDefault();
    weatherClass.getWeatherData("Edmonton", 2);
  }

  return (
    <>
      <button onClick={handleAPICall}>Call API</button>
      <button onClick={() => { weatherClass.parseData() }}>Show Some Data</button>
    </>
  );
}

export default App;
