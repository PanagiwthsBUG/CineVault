const axios = require("axios");


const omdb = axios.create({
  baseURL: "https://www.omdbapi.com/",
});


const searchMovies = async (title) => {

  const response = await omdb.get("/", {
    params: {
      apikey: process.env.OMDB_API_KEY,
      s: title,
      type: "movie",
    },
  });


  return response.data;

};


const getMovieDetails = async (imdbId) => {

  const response = await omdb.get("/", {
    params: {
      apikey: process.env.OMDB_API_KEY,
      i: imdbId,
      plot: "full",
    },
  });


  return response.data;

};


module.exports = {
  searchMovies,
  getMovieDetails,
};