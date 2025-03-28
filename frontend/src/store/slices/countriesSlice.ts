import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { CountryState } from '../../types/country';
import { countriesApi } from '../../api/services/countries';
import { RootState } from '../store';

const initialState: CountryState = {
    countries: [],
    loading: false,
    error: null,
    selectedCountry: null,
}

export const fetchAllCountries = createAsyncThunk('countries/fetchAllCountries', async () => {
    const response = await countriesApi.getAllCountries();
    return response;
})


export const countriesSlice = createSlice({
    name: 'countries',
    initialState,
    reducers: {
        clearSelectedCountry: (state) => {
            state.selectedCountry = null;
            state.error = null;
        }
    }, 
    extraReducers: (builder) => {
        builder.addCase(fetchAllCountries.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchAllCountries.fulfilled, (state, action) => {
            state.loading = false;
            state.countries = action.payload;
        })
        builder.addCase(fetchAllCountries.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string || 'Failed to fetch countries';
        })

    }
})

export const selectAllCountries = (state: RootState) => state.countries.countries;

export const { clearSelectedCountry } = countriesSlice.actions;
export default countriesSlice.reducer;