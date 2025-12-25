import { useRef, useState, useEffect } from "react"
import axios from "axios"
import sunnyBg from "../assets/sunnyBg.jpg"
import cloudyBg from "../assets/cloudyBg.jpg"
import rainyBg from "../assets/rainyBg.jpg"
import defaultBg from "../assets/defaultBg.jpg"
import "./WeatherInput.css"

export function WeatherInput() {
  const variableRef = useRef(null)
  const [city, setCity] = useState("")
  const [weather, setWeather] = useState(null)

  const handleClick = () => {
    setCity(variableRef.current.value)
  }

  useEffect(() => {
    if (!city) return

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8f1478fd12f3b41fbf5448aabf3f7469&units=metric`
        )
        setWeather(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [city])

  let backgroundImage = defaultBg

  if (weather) {
    const condition = weather.weather[0].main

    if (condition === "Clear") backgroundImage = sunnyBg
    else if (condition === "Clouds") backgroundImage = cloudyBg
    else if (condition === "Rain") backgroundImage = rainyBg
  }

  return (
    <div className="container"
      style={{
        backgroundImage:`url(${backgroundImage})`,
        backgroundSize: "cover",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      
      <input
        ref={variableRef}
        type="text"
        placeholder="Type in city here"
        size="30"
      />
      <button onClick={handleClick}>Submit</button>
      

      {weather && (
        <div  className="weather-box">
          <h3> Weather in {weather.name}</h3>
          <p className="temp" >Temp: {weather.main.temp}°C</p>
          <p className="desc" > Weather: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  )
}