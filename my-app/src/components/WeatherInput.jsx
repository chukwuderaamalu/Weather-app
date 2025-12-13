
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import  './weatherinput.css'
import cloudyBg  from "../../src/assets/cloudy.jpg"
import sunnyBg from "../../src/assets/sunny.jpg"
import rainyBg  from "../../src/assets/rainy.jpg"
import defaultBg  from "../../src/assets/default.jpg"

export function WeatherInput() {
  const inputRef = useRef(null);
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const handleClick = () => {
    const value = inputRef.current.value;
    if (!value) return alert("Please type a city name");
    setCity(value);
  };

  useEffect(() => {
    if (!city) return;

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8f1478fd12f3b41fbf5448aabf3f7469&units=metric`
      )
      .then((response) => setWeatherData(response.data))
      .catch((error) => {
        console.error("Error fetching weather:", error);
        setWeatherData(null);
      });
  }, [city]);


  let backgroundImage = defaultBg;

if (weatherData) {
  const condition = weatherData.weather[0].main;

  if (condition === "Clear") backgroundImage = sunnyBg;
  else if (condition === "Clouds") backgroundImage = cloudyBg;
  else if (condition === "Rain") backgroundImage = rainyBg;
}

  return (
    <div 
    className="app"
    style={{backgroundImage:`url(${backgroundImage})`}}
    >
    
      <input ref={inputRef} type="text" placeholder="Type in a city" size={30} />
      <button  onClick={handleClick}>Submit</button>
    
      {weatherData ? (
        <div>
          <h2 >Weather in {weatherData.name}</h2>
          <p> Temperature: {weatherData.main?.temp} °C</p>
          <p>Weather: {weatherData.weather?.[0]?.description}</p>
        </div>
      ) : city ? (
        <p>Loading or city not found...</p>
      ) : null}
    </div>
  );
}