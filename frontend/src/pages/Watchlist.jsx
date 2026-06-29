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


    } catch(error) {

      console.error(error);

    }

  };



  const updateStatus = async (id, status) => {

    try {

      await api.put(
        `/watchlist/${id}`,
        {
          status
        }
      );


      setMovies(

        movies.map(movie =>

          movie.id === id

            ? {
                ...movie,
                status
              }

            : movie

        )

      );


    } catch (error) {

      console.error(error);

    }

  };



  const getStatusClass = (status) => {

    switch (status) {

      case "watching":
        return "bg-warning text-dark";


      case "completed":
        return "bg-success";


      case "plan_to_watch":
        return "bg-primary";


      default:
        return "bg-secondary";

    }

  };



  const getStatusLabel = (status) => {

    switch(status) {

      case "watching":
        return "🍿 Watching";

      case "completed":
        return "✅ Completed";

      case "plan_to_watch":
        return "📌 Plan To Watch";

      default:
        return status;

    }

  };



  return (

    <div className="container py-5">


      <h1 className="text-center mb-5">

        🎬 My Watchlist

      </h1>



      <div className="row g-4">


        {movies.map((movie) => (


          <div

            className="col-12 col-md-4 col-lg-3"

            key={movie.id}

          >


            <div

              className="card bg-dark text-white shadow border-0 h-100"

            >



              {movie.poster_url &&


                <img

                  src={movie.poster_url}

                  className="card-img-top"

                  alt={movie.title}

                  style={{

                    height:"420px",

                    objectFit:"cover"

                  }}

                />

              }



              <div className="card-body d-flex flex-column">



                <h5>

                  {movie.title}

                </h5>



                <p className="text-secondary">

                  {movie.release_year}

                </p>




                <div className="mb-3">


                  <label className="form-label">

                    Status

                  </label>



                  <select

                    className="form-select"

                    value={movie.status}

                    onChange={(e) =>

                      updateStatus(

                        movie.id,

                        e.target.value

                      )

                    }

                  >


                    <option value="watching">

                      Watching

                    </option>


                    <option value="completed">

                      Completed

                    </option>


                    <option value="plan_to_watch">

                      Plan To Watch

                    </option>


                  </select>




                  <div className="mt-3">


                    <span

                      className={`badge ${getStatusClass(movie.status)}`}

                    >

                      {getStatusLabel(movie.status)}

                    </span>


                  </div>



                </div>




                <button

                  className="btn btn-danger mt-auto"

                  onClick={() =>

                    deleteMovie(movie.id)

                  }

                >

                  🗑 Remove

                </button>



              </div>


            </div>


          </div>


        ))}


      </div>


    </div>

  );

}


export default Watchlist;