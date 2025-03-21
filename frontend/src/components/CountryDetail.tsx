import { useParams } from "react-router-dom";
import { selectAllCountries } from "../store/slices/countriesSlice";
import { useAppSelector } from "../store/hooks";
import { Country } from "../types/country";
import { CardActionArea, CardActions } from "@mui/material";
import FavoriteButton from "./FavoriteButton";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PublicIcon from "@mui/icons-material/Public";
import PeopleIcon from "@mui/icons-material/People";
import Payments from "@mui/icons-material/Payments";

const CountryDetail = () => {
  const { name } = useParams();
  // const params = useParams();
  // console.log(params);
  const countries = useAppSelector(selectAllCountries);
  // console.log(countries.length);
  const country = countries.find(
    (country: Country) => country.name.common === name
  );
  // console.log(country);

  // const state = useAppSelector((state) => state);
  // console.log("Redux State:", state);

  if (!country) {
    return <div>Country not found</div>;
  }

  return (
    <div>
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
        <Payments color="action" fontSize="small" />
        Currencies:{" "}
        {Object.values(country?.currencies)
          .map((currency) => currency.name)
          .join(", ")}
      </p>
      <CardActionArea>
        <CardActions sx={{ mt: "auto", justifyContent: "flex-start" }}>
          <FavoriteButton country={country} />
        </CardActions>
      </CardActionArea>
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
