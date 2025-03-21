import LocationCityIcon from "@mui/icons-material/LocationCity";
import Payments from "@mui/icons-material/Payments";
import PeopleIcon from "@mui/icons-material/People";
import PublicIcon from "@mui/icons-material/Public";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Country } from "../types/country";
import { Link as RouterLink } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";

interface CountryCardProps {
  country: Country;
}

export const CountryCard = ({ country }: CountryCardProps) => {
  // const navigate = useNavigate();
  // const urlName = encodeURIComponent(country.name.common.toLowerCase());

  const getCurrencies = () => {
    if (!country.currencies) return "N/A";
    return Object.values(country.currencies)
      .map((currency) => `${currency.name} (${currency.symbol})`)
      .join(", ");
  };

  const getLanguages = () => {
    if (!country.languages) return "N/A";
    return Object.values(country.languages).join(", ");
  };

  return (
    <Card sx={{ maxWidth: 345, height: "100%" }}>
      <CardActionArea
        component={RouterLink}
        to={`/countries/${country.name.common}`}
      >
        <CardMedia
          component="img"
          height="140"
          image={country.flags.png}
          alt={country.flags.alt || `Flag of ${country.name.common}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {country.name.common}
          </Typography>

          <Box sx={{ display: "flex", gap: 1, alignItems: "center", mb: 1 }}>
            <PublicIcon color="action" fontSize="small" />
            <Typography variant="body2" color="text.secondary">
              {country.region}
              {country.subregion && ` (${country.subregion})`}
            </Typography>
          </Box>

          {country.capital && (
            <Box sx={{ display: "flex", gap: 1, alignItems: "center", mb: 1 }}>
              <LocationCityIcon color="action" fontSize="small" />
              <Typography variant="body2" color="text.secondary">
                {country.capital[0]}
              </Typography>
            </Box>
          )}

          <Box sx={{ display: "flex", gap: 1, alignItems: "center", mb: 1 }}>
            <PeopleIcon color="action" fontSize="small" />
            <Typography variant="body2" color="text.secondary">
              {country.population.toLocaleString()}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 1, alignItems: "center", mb: 1 }}>
            <RecordVoiceOverIcon color="action" fontSize="small" />
            <Typography variant="body2" color="text.secondary" noWrap>
              {getLanguages()}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Payments color="action" fontSize="small" />
            <Typography variant="body2" color="text.secondary" noWrap>
              {getCurrencies()}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ mt: "auto", justifyContent: "flex-start" }}>
        <FavoriteButton country={country} />
      </CardActions>
    </Card>
  );
};

export default CountryCard;
