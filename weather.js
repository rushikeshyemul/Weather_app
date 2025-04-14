import { createInterface } from "readline/promises";
import process from "process";

const API_KEY = "your_weather_api"; // Apply API here
const BASE_URL = "url"; // apply url here

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const getWeather = async (city) => {
  const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`City not found: ${res.statusText}`);
    }
    const weatherData = await res.json();

    console.log("\nWeather Information:");
    console.log(`City: ${weatherData.name}`);
    console.log(`Temperature: ${weatherData.main.temp}°C`);
    console.log(`Humidity: ${weatherData.main.humidity}%`);
    console.log(`Description: ${weatherData.weather[0].description}`);
    console.log(`Wind Speed: ${weatherData.wind.speed} m/s`);
    console.log(`Visibility: ${weatherData.visibility / 1000} km`);
    console.log(`Cloudiness: ${weatherData.clouds.all}%`);
    console.log(`Pressure: ${weatherData.main.pressure} hPa`);
    console.log(
      `Sunrise: ${new Date(
        weatherData.sys.sunrise * 1000
      ).toLocaleTimeString()}`
    );
  } catch (err) {
    console.error("Error fetching weather data:", err.message);
  }
};

// Async IIFE to allow top-level await
(async () => {
  const city = await rl.question("Enter the city name: ");
  if (!city.trim()) {
    console.log("City name cannot be empty.");
  } else {
    await getWeather(city);
  }
  rl.close();
})();
