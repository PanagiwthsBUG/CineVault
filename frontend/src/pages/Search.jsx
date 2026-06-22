import { useState } from "react";
import api from "../api/axios";

function Search() {

  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);


  const searchMovies = async (e) => {
    e.preventDefault();

    try {

      const response = await api.get(
        `/movies/search?query=${query}`
      );

      setMovies(response.data.Search || []);

    } catch (error) {

      console.error(error);

    }
  };


  const addToWatchlist = async (movie) => {

    try {

      // 1. Save movie to database

        const savedMovie = await api.post(
        "/movies/save",
        {
            imdbID: movie.imdbID,
            Title: movie.Title,
            Year: movie.Year,
            Poster: movie.Poster
        }
        );


      // 2. Add to watchlist

      await api.post(
        "/watchlist",
        {
          movieId: savedMovie.data.id,
          status: "watching"
        }
      );


      alert("Added to watchlist 🎬");


    } catch (error) {

      console.error(
        error.response?.data || error.message
      );

      alert("Failed");

    }
  };


  return (
    <div>

      <h1>CineVault Search</h1>


      <form onSubmit={searchMovies}>

        <input
          placeholder="Search movie..."
          value={query}
          onChange={(e) =>
            setQuery(e.target.value)
          }
        />

        <button>
          Search
        </button>

      </form>


      <hr />


      {movies.map((movie) => (

        <div key={movie.imdbID}>


          <h2>
            {movie.Title}
          </h2>


          <p>
            {movie.Year}
          </p>


          {movie.Poster !== "N/A" &&
            <img
              src={movie.Poster}
              width="150"
            />
          }


          <br />


          <button
            onClick={() =>
              addToWatchlist(movie)
            }
          >
            Add to Watchlist
          </button>


          <hr />

        </div>

      ))}


    </div>
  );
}


export default Search;