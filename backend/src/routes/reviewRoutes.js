const express = require("express");

const router = express.Router();


const authMiddleware = require("../middleware/authMiddleware");


const {
  addReview,
  getMovieReviews,
} = require("../controllers/reviewController");



// POST review

router.post(
  "/",
  authMiddleware,
  addReview
);



// GET reviews of movie

router.get(
  "/movie/:movieId",
  getMovieReviews
);



module.exports = router;