import { useAuth } from "../context/AuthContext.tsx";
import { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Typography } from "@mui/material";
import { useAppSelector } from "../store/hooks";
import { selectAllCountries } from "../store/slices/countriesSlice";
import { useState } from "react";
import { CountryFavorite } from "../types/favorite.ts";
import { favoritesApi } from "../api/services/favorites";
// import { Country } from '../types/country';
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import CountryCard from "./CountryCard.tsx";

const Favorites = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<CountryFavorite[]>([]);
  const allCountries = useAppSelector(selectAllCountries);

  useEffect(() => {
    if (!user) return;

    const fetchFavorites = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await favoritesApi.getFavorites();
        setFavorites(data);
        // console.log(favorites);
      } catch (error) {
        console.log("Error fetching favorites", error);
        setError("Failed to load favorites. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, [user]);

  const convertToCountry = (favorite: CountryFavorite) => {
    const fullCountry = allCountries.find(
      (c) => c.name.common === favorite.country_name
    );
    if (fullCountry) {
      return fullCountry;
    }

    return {
      name: {
        common: favorite.country_name,
        official: favorite.country_name,
      },
      cca3: favorite.country_code,
      flags: {
        png: favorite.country_flag,
        svg: favorite.country_flag,
      },
      region: "Favorite",
      subregion: "Favorite",
      population: 0,
      capital: ["Favorite"],
      currencies: {
        FAV: {
          name: "Favorite Currency",
          symbol: "❤",
        },
      },
    };
  };
  if (!user) {
    return <div>Please log in to view your favorites</div>;
  }

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Your Favorites
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {favorites.length === 0 ? (
        <Alert severity="info">You have no favorite countries yet.</Alert>
      ) : (
        <Grid container spacing={3}>
          {favorites.map((favorite) => {
            const country = convertToCountry(favorite);
            return (
              <Grid item xs={12} sm={6} md={4} key={country.name.common}>
                <CountryCard country={country} />
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
};

export default Favorites;
