import {useParams} from 'react-router-dom';
import { selectAllCountries } from '../store/slices/countriesSlice';
import {useAppSelector} from '../store/hooks';
import {Country} from '../types/country';

const CountryDetail = () => {
    const { name } = useParams();
    // const params = useParams();
    // console.log(params);
    const countries = useAppSelector(selectAllCountries);
    // console.log(countries.length);
    const country = countries.find((country: Country) => country.name.common === name);
    // console.log(country);  

    // const state = useAppSelector((state) => state);
    // console.log("Redux State:", state);

    if (!country) {
        return <div>Country not found</div>;
      }

    return (
        <div>
            <h1>{country?.name.common}</h1>
            <img src={country?.flags.png} alt={country?.name.common} />
           <p>Capital: {country?.capital}</p>
           <p>Region: {country?.region}</p>
            <p>Subregion: {country?.subregion}</p>
            <p>Population: {country?.population}</p>
            <p>Currencies: {Object.values(country?.currencies).map((currency) => currency.name).join(', ')}</p>
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