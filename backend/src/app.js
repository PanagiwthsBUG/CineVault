const movieRoutes = require("./routes/movieRoutes");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/movies", movieRoutes);

app.get("/", (req, res) => {
  res.send("CineVault API Running");
});

module.exports = app;