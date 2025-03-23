import {Country} from '@/models/Country';
import {api} from '../axios';

export const countriesApi = {  
    getAllCountries: () => api.get<Country[], Country[]>('https://restcountries.com/v3.1/all'),
};