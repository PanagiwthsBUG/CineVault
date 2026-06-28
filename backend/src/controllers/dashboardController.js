const pool = require("../db/db");

const getDashboard = async (req, res) => {

  try {

    const userId = req.user.id;

    // Συνολικές ταινίες

    const total = await pool.query(
      `
      SELECT COUNT(*) AS total
      FROM watchlists
      WHERE user_id = $1
      `,
      [userId]
    );

    // Watching

    const watching = await pool.query(
      `
      SELECT COUNT(*) AS total
      FROM watchlists
      WHERE user_id = $1
      AND status = 'watching'
      `,
      [userId]
    );

    // Completed

    const completed = await pool.query(
      `
      SELECT COUNT(*) AS total
      FROM watchlists
      WHERE user_id = $1
      AND status = 'completed'
      `,
      [userId]
    );

    // Plan to watch

    const planned = await pool.query(
      `
      SELECT COUNT(*) AS total
      FROM watchlists
      WHERE user_id = $1
      AND status = 'plan_to_watch'
      `,
      [userId]
    );

    res.json({

      watchlistCount: Number(total.rows[0].total),

      watching: Number(watching.rows[0].total),

      completed: Number(completed.rows[0].total),

      planToWatch: Number(planned.rows[0].total),

    });

  }

  catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Internal server error"
    });

  }

};

module.exports = {
  getDashboard
};