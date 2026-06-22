import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Search from "./pages/Search";
import Watchlist from "./pages/Watchlist";

function App() {
  return (
    <Routes>

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/search"
        element={<Search />}
      />

      <Route
        path="/watchlist"
        element={<Watchlist />}
        />


    </Routes>
  );
}

export default App;