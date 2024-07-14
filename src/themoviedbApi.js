import axios from "axios";

// const API_KEY = "690241e822fb59a08789d4be8684466";

const baseUrl = "https://api.themoviedb.org/3";

const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OTAyNDFlYzgyMmZiNTlhMDg3ODlkNGJlODY4NDQ2NiIsIm5iZiI6MTcyMDg3NTEzNy4zODUwOTcsInN1YiI6IjY2OTI0OWQwMjg1MDlmZGQ4NTYzYTMyOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2S4Zg9odcqZf9WwoisYFGuIhi3zOETVmPUlmtAWIPPM",
  },
};
// Виконання запиту
axios
  .get(baseUrl, options)
  .then((response) => {
    console.log(response.data);
  })
  .catch((err) => {
    console.error(err);
  });
//
export const getTrendingMovies = async function () {
  const response = await axios.get(`${baseUrl}/trending/movie/`, {
    params: {
      time_window: day,
      language: "en-US",
    },
    options,
  });

  return response.data.results;
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

export const getMovieDetails = async function (id) {
  const response = await axios.get(`${baseUrl}/movie/${id}`, {
    params: {
      movie_id: id,
      // append_to_response:
      language: "en-US",
    },
    options,
  });

  return response.data;
};

export const getMovieCredits = async function (id) {
  const response = await axios.get(`${baseUrl}/movie/${id}/credits`, {
    params: {
      movie_id: id,
      language: "en-US",
    },
    options,
  });

  return response.data;
};
export const getMovieReviews = async function (id, page) {
  const response = await axios.get(`${url}/movie/${id}/reviews`, {
    params: {
      movie_id: id,
      language: "en-US",
      page: page,
    },
    options,
  });

  return response.data.results;
};

// import axios from "axios";

// const API_KEY = "ab955d544a99ac7e4a4d9bade19e2bcc";

// const baseUrl = "https://api.themoviedb.org/3";

// const trendingUrl = `${baseUrl}/trending/movie/day?api_key=${API_KEY}`;

// export const fetchMovies = async () => {
//   const { data } = await axios.get(trendingUrl);

//   return data;
// };

// export const fetchMovieById = async (id) => {
//   const movieUrl = `${baseUrl}/movie/${id}?api_key=${API_KEY}`;
//   const { data } = await axios.get(movieUrl);
//   return data;
// };
// export const fetchCast = async (id) => {
//   const castUrl = `${baseUrl}/movie/${id}/credits?api_key=${API_KEY}`;
//   const { data } = await axios.get(castUrl);

//   return data;
// };

// export const fetchReviews = async (id) => {
//   const reviewUrl = `${baseUrl}/movie/${id}/reviews?api_key=${API_KEY}`;

//   const { data } = await axios.get(reviewUrl);

//   return data;
// };

// export const fetchMovieByQuery = async (query) => {
//   const queryUrl = `${baseUrl}/search/movie?api_key=${API_KEY}&query=${query}`;
//   const { data } = await axios.get(queryUrl);

//   return data.results;
// };
