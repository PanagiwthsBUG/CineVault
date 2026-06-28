function MovieCard({ movie, onAdd }) {


  return (

    <div
        className="card bg-dark text-white h-100 shadow border-0"

        style={{
            transition:"0.3s"
        }}

        onMouseEnter={(e)=>
            e.currentTarget.style.transform="scale(1.03)"
        }

        onMouseLeave={(e)=>
            e.currentTarget.style.transform="scale(1)"
        }

        >
      <img

        src={
          movie.Poster !== "N/A"
            ? movie.Poster
            : "https://via.placeholder.com/300x450"
        }

        className="card-img-top"

        alt={movie.Title}

        style={{
          height:"420px",
          objectFit:"cover"
        }}

      />


      <div className="card-body d-flex flex-column">


        <h5 className="card-title">
          {movie.Title}
        </h5>


        <p className="text-secondary">
          {movie.Year}
        </p>



        <button

          className="btn btn-warning mt-auto"

          onClick={() => onAdd(movie)}

        >

          + Watchlist

        </button>


      </div>


    </div>

  );

}


export default MovieCard;