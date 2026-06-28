import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.removeItem("token");

    navigate("/login");

  };


  return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

      <div className="container">


        <Link
          className="navbar-brand fw-bold"
          to="/"
        >
          🎬 CineVault
        </Link>



        <div className="navbar-nav ms-auto">


          <Link
            className="nav-link"
            to="/"
          >
            Home
          </Link>


          <Link
            className="nav-link"
            to="/search"
          >
            Search
          </Link>


          <Link
            className="nav-link"
            to="/watchlist"
          >
            Watchlist
          </Link>



          <button
            className="btn btn-warning ms-3"
            onClick={logout}
          >
            Logout
          </button>


        </div>


      </div>

    </nav>

  );

}


export default Navbar;