import { useEffect, useState } from "react";
import api from "../api/axios";


function Watchlist() {

  const [movies, setMovies] = useState([]);


  const loadWatchlist = async () => {

    try {

      const response = await api.get(
        "/watchlist"
      );

      setMovies(response.data);


    } catch (error) {

      console.error(
        error.response?.data || error.message
      );

    }
  };


  useEffect(() => {

    loadWatchlist();

  }, []);



  const deleteMovie = async (id) => {

    try {

      await api.delete(
        `/watchlist/${id}`
      );


      setMovies(
        movies.filter(
          movie => movie.id !== id
        )
      );


    } catch(error){

      console.error(error);

    }

  };



  return (

    <div>

      <h1>
        My Watchlist 🎬
      </h1>


      {movies.map(movie => (

        <div key={movie.id}>


          <h2>
            {movie.title}
          </h2>


          <p>
            Year: {movie.release_year}
          </p>


          <p>
            Status: {movie.status}
          </p>


          {movie.poster_url &&
            <img
              src={movie.poster_url}
              width="150"
            />
          }


          <br/>


          <button
            onClick={() =>
              deleteMovie(movie.id)
            }
          >
            Remove
          </button>


          <hr/>


        </div>

      ))}


    </div>

  );

}


export default Watchlist;