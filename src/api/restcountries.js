import axios from "axios";

export const getAllCountries = async () => {
  try {
    const response = await axios.get(
      "https://restcountries.com/v3.1/independent?status=true"
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getCountryByRegion = async (region) => {
  try {
    const response = await axios.get(
      `https://restcountries.com/v3.1/region/${region}?fields=translations,flags,independent,capital`
    );
    const independentCountries = response.data.filter(
      (country) => country.independent === true
    );
    return independentCountries;
  } catch (error) {
    console.error(error);
    return null;
  }
};
