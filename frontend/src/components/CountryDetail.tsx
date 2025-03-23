import { useParams, useNavigate } from "react-router-dom";
import { selectAllCountries } from "../store/slices/countriesSlice";
import { useAppSelector } from "../store/hooks";
import { Country } from "../types/country";
import { CardActionArea, CardActions, Button } from "@mui/material";
import FavoriteButton from "./FavoriteButton";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PublicIcon from "@mui/icons-material/Public";
import PeopleIcon from "@mui/icons-material/People";
import Payments from "@mui/icons-material/Payments";
import { weatherApi, WeatherData } from "../api/services/weather";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

const CountryDetail = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const countries = useAppSelector(selectAllCountries);
  const country = countries.find(
    (country: Country) => country.name.common === name
  );
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loadingWeather, setLoadingWeather] = useState(true);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  useEffect(() => {
    if (country?.capital) {
      weatherApi
        .getWeatherByCity(country.capital[0])
        .then((data) => {
          setWeather(data);
          setLoadingWeather(false);
        })
        .catch((error) => {
          setWeatherError(
            `Failed to load weather data for ${country.capital[0]}`
          );
          setLoadingWeather(false);
        });
    }
  }, [country?.capital]);

  if (!country) {
    return <div>Country not found</div>;
  }

  const getLanguages = () => {
    if (!country.languages) return "N/A";
    return Object.values(country.languages).join(", ");
  };

  return (
    <div>
      <div>
        <Button variant="contained" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>
      <img src={country?.flags.png} alt={country?.name.common} />
      <h1>{country?.name.common}</h1>
      <p>
        {" "}
        <LocationCityIcon color="action" fontSize="small" />
        Capital: {country?.capital}
      </p>
      <p>
        <PublicIcon color="action" fontSize="small" />
        Region: {country?.region}
      </p>
      <p>
        <PeopleIcon color="action" fontSize="small" />
        Population: {country?.population}
      </p>
      <p>
        <PeopleIcon color="action" fontSize="small" />
        Language: {getLanguages()}
      </p>
      <p>
        <Payments color="action" fontSize="small" />
        Currencies:{" "}
        {Object.values(country?.currencies)
          .map((currency) => currency.name)
          .join(", ")}
      </p>
      <CardActions sx={{ mt: "auto", justifyContent: "flex-start" }}>
        <FavoriteButton country={country} />
      </CardActions>
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6">Weather in {country?.capital}</Typography>
        {loadingWeather && <p>Loading weather...</p>}
        {weatherError && <p>{weatherError}</p>}
        {weather && (
          <Box>
            <Typography variant="body1">
              Temperature: {weather.main.temp}°C
            </Typography>
            <Typography variant="body1">
              Feels Like: {weather.main.feels_like}°C
            </Typography>
            <Typography variant="body1">
              Humidity: {weather.main.humidity}%
            </Typography>
            <Typography variant="body1">
              Wind Speed: {weather.wind.speed} m/s
            </Typography>
            <Typography variant="body1">
              Condition: {weather.weather[0].description}
            </Typography>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              alt={weather.weather[0].description}
            />
          </Box>
        )}
      </Box>
    </div>
  );
};

export default CountryDetail;

// name: CountryName;
// capital?: string[];
// region: string;
// subregion?: string;
// population: number;
// flags: CountryFlags;
// cca3: string;
// currencies: Record<string, Currency>;
