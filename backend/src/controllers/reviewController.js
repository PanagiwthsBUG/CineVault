const pool = require("../db/db");


// CREATE REVIEW

const addReview = async (req, res) => {

  try {

    const userId = req.user.id;

    const {
      movieId,
      rating,
      reviewText
    } = req.body;


    if (!movieId || !rating) {
      return res.status(400).json({
        error: "movieId and rating are required",
      });
    }


    const result = await pool.query(
      `
      INSERT INTO reviews
      (
        user_id,
        movie_id,
        rating,
        review_text
      )
      VALUES
      (
        $1,
        $2,
        $3,
        $4
      )

      RETURNING *
      `,
      [
        userId,
        movieId,
        rating,
        reviewText
      ]
    );


    res.status(201).json(result.rows[0]);


  } catch(error) {

    console.error(error);


    if(error.code === "23505") {

      return res.status(409).json({
        error: "You already reviewed this movie",
      });

    }


    res.status(500).json({
      error:"Internal server error",
    });

  }

};




// GET MOVIE REVIEWS

const getMovieReviews = async (req,res)=>{


  try {


    const movieId = req.params.movieId;


    const result = await pool.query(
      `
      SELECT
        reviews.id,
        reviews.rating,
        reviews.review_text,
        reviews.created_at,
        users.username

      FROM reviews

      JOIN users
      ON reviews.user_id = users.id

      WHERE movie_id = $1

      ORDER BY created_at DESC

      `,
      [movieId]
    );


    res.json(result.rows);



  } catch(error){

    console.error(error);


    res.status(500).json({
      error:"Internal server error",
    });

  }

};



module.exports = {
  addReview,
  getMovieReviews,
};