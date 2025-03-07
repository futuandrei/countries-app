import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {
    fetchAllCountries,
    selectAllCountries,
} from "../store/slices/countriesSlice";
import {Link} from "react-router-dom";
// import {CountryDetail} from "../types/country";
import "./CountriesList.css";


const CountriesList = () => {
    const dispatch = useAppDispatch();
    const countries = useAppSelector(selectAllCountries);
    // console.log(countries);

    useEffect(() => {
        dispatch(fetchAllCountries());
    }, [dispatch]);

    return (
        <div>
            <h1>Countries</h1>
            <div className="cards">
                {countries.map((country) => (
                    <div className="Card" key={country.cca3}> {/* div*/}
                        <h1>{country?.name.common}</h1>
                        <img src={country?.flags.png} alt={country?.name.common} />
                        <p>Capital: {country?.capital}</p>
                        <p>Region: {country?.region}</p>
                        <p>Subregion: {country?.subregion}</p>
                        <p>Population: {country?.population}</p>
                        <p>Currency: {country?.currency}</p>
                        <Link to={`/countries/${country.name.common}`}>{country.name.common}</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CountriesList;