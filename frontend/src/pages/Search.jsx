import { useState } from "react";

import api from "../api/axios";

import MovieCard from "../components/MovieCard";

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

<div className="container py-5">


<h1 className="text-center mb-4">
  🎬 CineVault Search
</h1>



<form
  onSubmit={searchMovies}
  className="d-flex gap-2 mb-5"
>


<input

  className="form-control"

  placeholder="Search movie..."

  value={query}

  onChange={(e)=>
    setQuery(e.target.value)
  }

/>


<button
  className="btn btn-warning"
>

Search

</button>


</form>




<div className="row g-4">


{movies.map((movie)=>(


<div
  className="col-12 col-md-4 col-lg-3"
  key={movie.imdbID}
>


<MovieCard

 movie={movie}

 onAdd={addToWatchlist}

/>


</div>


))}


</div>


</div>

);

}

export default Search;