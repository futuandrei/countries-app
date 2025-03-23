import { api } from "../axios";
import axios from "axios";

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

export interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
}

export const weatherApi = {
  getWeatherByCity: async (city: string): Promise<WeatherData> => {
    try {
      const response = await axios.get<WeatherData>(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(
          `Error fetching weather data for ${city}:`,
          error.response.data
        );
      } else {
        console.error(
          `Error fetching weather data for ${city}:`,
          error.message
        );
      }
      throw error;
    }
  },
};
