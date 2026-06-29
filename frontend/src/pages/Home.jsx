import { useEffect, useState } from "react";
import api from "../api/axios";

function Home() {

  const [stats, setStats] = useState(null);

  useEffect(() => {

    const loadDashboard = async () => {

      try {

        const response = await api.get("/dashboard");

        setStats(response.data);

      } catch (error) {

        console.error(error);

      }

    };

    loadDashboard();

  }, []);

  if (!stats) {

    return (

      <div className="container py-5 text-center">

        <h2>Loading...</h2>

      </div>

    );

  }

  return (

    <div className="container py-5">

      {/* Hero Section */}

      <div className="bg-dark rounded-4 p-5 mb-5 shadow">

        <h1 className="display-5 fw-bold">
          🎬 Welcome to CineVault
        </h1>

        <p className="lead mt-3 text-secondary">
          Track your movies, organize your watchlist and discover your next favorite film.
        </p>

      </div>


      {/* Statistics */}

      <div className="row g-4">

        <div className="col-md-3">

          <div className="card bg-dark text-white text-center shadow border-0 h-100">

            <div className="card-body">

              <h1 className="display-4 fw-bold text-warning">
                {stats.watchlistCount}
              </h1>

              <p>Total Movies</p>

            </div>

          </div>

        </div>


        <div className="col-md-3">

          <div className="card bg-dark text-white text-center shadow border-0 h-100">

            <div className="card-body">

              <h1 className="display-4 fw-bold text-warning">
                {stats.watching}
              </h1>

              <p>Watching</p>

            </div>

          </div>

        </div>


        <div className="col-md-3">

          <div className="card bg-dark text-white text-center shadow border-0 h-100">

            <div className="card-body">

              <h1 className="display-4 fw-bold text-warning">
                {stats.completed}
              </h1>

              <p>Completed</p>

            </div>

          </div>

        </div>


        <div className="col-md-3">

          <div className="card bg-dark text-white text-center shadow border-0 h-100">

            <div className="card-body">

              <h1 className="display-4 fw-bold text-warning">
                {stats.planToWatch}
              </h1>

              <p>Plan To Watch</p>

            </div>

          </div>

        </div>

      </div>


      {/* Quick Actions */}

      <div className="mt-5">

        <h3 className="mb-4">
          Quick Actions
        </h3>

        <div className="d-flex gap-3 justify-content-center">

          <a
            href="/search"
            className="btn btn-warning"
          >
            🔍 Search Movies
          </a>

          <a
            href="/watchlist"
            className="btn btn-outline-light"
          >
            🎬 My Watchlist
          </a>

        </div>

      </div>

    </div>

  );

}

export default Home;