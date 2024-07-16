// const API_KEY = "690241e822fb59a08789d4be8684466";
import axios from "axios";
const baseUrl = "https://api.themoviedb.org/3";
const API_KEY = "690241ec822fb59a08789d4be8684466";
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
        // time_window: "day",
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
      api_key: API_KEY,
      query: query,
      page: page,
      include_adult: false,
      language: "en-US",
    },
    options,
  });

  return response.data.results;
};

export const getMovieDetails = async function (id) {
  const response = await axios.get(`${baseUrl}/movie/${id}`, {
    params: {
      api_key: API_KEY,
      // append_to_response:
      language: "en-US",
    },
  });

  return response.data;
};

export const getMovieCredits = async function (id) {
  const response = await axios.get(`${baseUrl}/movie/${id}/credits`, {
    params: {
      api_key: API_KEY,
      language: "en-US",
    },
    // options,
  });
  // console.log("API Response:", response.data); // Додано для відлагодження
  return response.data; // Оновлено з results на cast, якщо API повертає саме акторів
};

export const getMovieReviews = async function (id, page = 1) {
  const response = await axios.get(`${baseUrl}/movie/${id}/reviews`, {
    params: {
      api_key: API_KEY,
      language: "en-US",
      page: page,
      movie_id: id,
    },
    // options,
  });
  // console.log(response.data);

  return response.data.results;
};
