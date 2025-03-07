import { useAuth } from '../context/AuthContext.tsx';
import { useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';
import { useAppSelector } from '../store/hooks';
import { selectAllCountries } from '../store/slices/countriesSlice';
import { useState } from 'react';
import { CountryFavorite } from '../types/country';
// import { favoritesApi } from '../api/favoritesApi';
import { Country } from '../types/country';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';

const Favorites = () => {
    const {user} = useAuth();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [favorites, setFavorites] = useState<CountryFavorite[]>([]);
    const allCountries = useAppSelector(selectAllCountries);

    useEffect(()=> {
        if(!user) return;

            const fetchFavorites = async () => {
                setLoading(true);
                setError(null);
                try {
                    const data = await favoritesApi.getFavorites();
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
        const fullCountry = allCountries.find((c) => c.name.common === favorite.country_name)
        if(fullCountry) {
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
                name: "Favorite Currencty",
                symbol: "❤",
            },
        },
    };
};
if(!user) {
    return <div>Please log in to view your favorites</div>;
}

if(loading) {
    return <Box sx={{display: 'flex', justifyContent: 'center', p:4}}>
        <CircularProgress />
    </Box>;

}
return (
    <Box sx={{p:3}}>
        <Typography variant="h4" gutterBottom>
            Your Favorites
        </Typography>
        {error && (<Alert severity="error" sx={{mb:3}}>
            {error}
        </Alert>
        )}

        {
            favorites.length === 0 ? (<Alert severity="info">
                You have no favorite countries yet.
            </Alert>) : (<Grid container spacing={3}>
                {favorites.map((favorite)=> 
                <Grid item key={favorite.id} xs={12} sm={6} md={4} lg={3}>
                    <CountryCard country={convertToCountry(favorite)} />
                    {/* <div>
                        <h1>{country?.name.common}</h1>
                        <img src={country?.flags.png} alt={country?.name.common} />
                        <p>Capital: {country?.capital}</p>
                        <p>Region: {country?.region}</p>
                        <p>Subregion: {country?.subregion}</p>
                        <p>Population: {country?.population}</p>
                        <p>Currencies: {Object.values(country?.currencies).map((currency) => currency.name).join(', ')}</p>
                    </div> */}
                </Grid>
                    )}
            </Grid>)
        }

    </Box>
)
};

export default Favorites;