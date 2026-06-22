const movieRoutes = require("./routes/movieRoutes");
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const watchlistRoutes = require("./routes/watchlistRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/movies", movieRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/watchlist", watchlistRoutes);

app.get("/", (req, res) => {
  res.send("CineVault API Running");
});

module.exports = app;