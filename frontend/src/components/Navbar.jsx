import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.removeItem("token");

    navigate("/login");

  };

  return (

    <nav>

      <h2>CineVault 🎬</h2>

      <Link to="/">Home</Link>

      {" | "}

      <Link to="/search">Search</Link>

      {" | "}

      <Link to="/watchlist">Watchlist</Link>

      {" | "}

      <button onClick={logout}>
        Logout
      </button>

      <hr />

    </nav>

  );

}

export default Navbar;