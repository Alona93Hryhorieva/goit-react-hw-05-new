// const API_KEY = "690241e822fb59a08789d4be8684466";

import axios from "axios";
const baseUrl = "https://api.themoviedb.org/3";
const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OTAyNDFlYzgyMmZiNTlhMDg3ODlkNGJlODY4NDQ2NiIsIm5iZiI6MTcyMDg3NTEzNy4zODUwOTcsInN1YiI6IjY2OTI0OWQwMjg1MDlmZGQ4NTYzYTMyOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2S4Zg9odcqZf9WwoisYFGuIhi3zOETVmPUlmtAWIPPM",
  },
};
export const getTrendingMovies = async function () {
  try {
    const response = await axios.get(`${baseUrl}/trending/movie/day`, {
      params: {
        time_window: "day",
        language: "en-US",
      },
      headers: options.headers,
    });
    // console.log(response.data);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
  }
};

export const getSearchMovie = async function (query, page) {
  const response = await axios.get(`${baseUrl}/search/movie`, {
    params: {
      query: query,
      page: page,
      include_adult: false,
      language: "en-US",
    },
    options,
  });

  return response.data.results;
};

// export const getMovieDetails = async function (id) {
//   const response = await axios.get(`${baseUrl}/movie/${id}`, {
//     params: {
//       movie_id: id,
//       // append_to_response:
//       language: "en-US",
//     },
//     options,
//   });

//   return response.data;
// };

// export const getMovieCredits = async function (id) {
//   const response = await axios.get(`${baseUrl}/movie/${id}/credits`, {
//     params: {
//       movie_id: id,
//       language: "en-US",
//     },
//     options,
//   });

//   return response.data;
// };
// export const getMovieReviews = async function (id, page) {
//   const response = await axios.get(`${url}/movie/${id}/reviews`, {
//     params: {
//       movie_id: id,
//       language: "en-US",
//       page: page,
//     },
//     options,
//   });

//   return response.data.results;
// };

// import axios from "axios";
// import { transformCountriesData, transformCountryData } from "helpers";

// axios.defaults.baseURL = "https://restcountries.com/v3.1";

// export const getCountries = async () => {
//   const { data } = await axios.get("/region/europe");
//   const countries = transformCountriesData(data);

//   return countries;
// };

// export const fetchCountry = async (id) => {
//   const { data } = await axios.get(`/name/${id}`);
//   const country = transformCountryData(data);

//   return country[0];
// };

// export const fetchByRegion = async (region) => {
//   const { data } = await axios.get(`/region/${region}`);
//   const countries = transformCountriesData(data);

//   return countries;
// };

// export const transformCountriesData = (data) => {
//   return data.map(
//     ({ name: { common }, capital, flags, population, languages }) => ({
//       id: common,
//       country: common,
//       flag: flags.png,
//       capital,
//       population,
//       languages,
//     })
//   );
// };

// export const transformCountryData = (data) => {
//   return data.map(
//     ({
//       name: { common, official },
//       flags,
//       capital,
//       population,
//       languages,
//     }) => ({
//       id: common,
//       countryName: official,
//       flag: flags.png,
//       capital,
//       population,
//       languages: Object.values(languages),
//     })
//   );
// };
