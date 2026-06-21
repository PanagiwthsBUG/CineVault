const pool = require("../db/db");

const getAllMovies = async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT *
      FROM movies
      ORDER BY title;
      `
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching movies:", error);

    res.status(500).json({
      error: "Internal server error",
    });
  }
};

module.exports = {
  getAllMovies,
};