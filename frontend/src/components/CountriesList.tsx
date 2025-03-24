import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchAllCountries,
  selectAllCountries,
} from "../store/slices/countriesSlice";
// import {CountryDetail} from "../types/country";
import "./CountriesList.css";
import CountryCard from "./CountryCard";
import Search from "./Search";

const CountriesList = () => {
  const dispatch = useAppDispatch();
  const countries = useAppSelector(selectAllCountries);
  const loading = useAppSelector((state) => state.countries.loading);
  const error = useAppSelector((state) => state.countries.error);
  // console.log(countries);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchAllCountries());
  }, [dispatch]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredCountries = countries
    .filter((country) =>
      country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => a.name.common.localeCompare(b.name.common));

  return (
    <div>
      <h1 style={{ paddingLeft: "8px" }}>Countries</h1>
      <div className="search-container">
        <Search searchQuery={searchQuery} onSearchChange={handleSearchChange} />
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
      </div>
      <div className="cards">
        {filteredCountries.map((country) => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </div>
    </div>
  );
};

export default CountriesList;
