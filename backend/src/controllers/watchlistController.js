const pool = require("../db/db");

const addToWatchlist = async (req, res) => {
  try {
    const userId = req.user.id;

    const { movieId, status } = req.body;

    if (!movieId || !status) {
      return res.status(400).json({
        error: "movieId and status are required",
      });
    }

    const result = await pool.query(
      `
      INSERT INTO watchlists
      (
        user_id,
        movie_id,
        status
      )
      VALUES
      (
        $1,
        $2,
        $3
      )
      RETURNING *
      `,
      [userId, movieId, status]
    );

    res.status(201).json(result.rows[0]);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Internal server error",
    });

  }
};

const getWatchlist = async (req, res) => {
  try {

    const userId = req.user.id;


    const result = await pool.query(
      `
      SELECT
        watchlists.id,
        movies.title,
        movies.release_year,
        movies.poster_url,
        watchlists.status,
        watchlists.created_at

      FROM watchlists

      JOIN movies
      ON watchlists.movie_id = movies.id

      WHERE watchlists.user_id = $1

      ORDER BY watchlists.created_at DESC
      `,
      [userId]
    );


    res.json(result.rows);


  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Internal server error",
    });

  }
};

const updateWatchlistStatus = async (req, res) => {
  try {

    const userId = req.user.id;
    const watchlistId = req.params.id;

    const { status } = req.body;


    if (!status) {
      return res.status(400).json({
        error: "Status is required",
      });
    }


    const result = await pool.query(
      `
      UPDATE watchlists
      SET status = $1
      WHERE id = $2
      AND user_id = $3
      RETURNING *
      `,
      [
        status,
        watchlistId,
        userId
      ]
    );


    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Watchlist item not found",
      });
    }


    res.json(result.rows[0]);


  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Internal server error",
    });

  }
};

const deleteFromWatchlist = async (req, res) => {

  try {

    const userId = req.user.id;
    const watchlistId = req.params.id;


    const result = await pool.query(
      `
      DELETE FROM watchlists
      WHERE id = $1
      AND user_id = $2
      RETURNING *
      `,
      [
        watchlistId,
        userId
      ]
    );


    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Watchlist item not found",
      });
    }


    res.json({
      message: "Removed from watchlist",
      deleted: result.rows[0],
    });


  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Internal server error",
    });

  }

};

module.exports = {
  addToWatchlist,
  getWatchlist,
  updateWatchlistStatus,
  deleteFromWatchlist,
};