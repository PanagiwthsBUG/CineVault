const express = require("express");

const router = express.Router();


const {
 searchMovie,
 movieDetails,
 saveMovie,
} = require("../controllers/movieController");



router.get(
 "/search",
 searchMovie
);


router.get(
 "/:id",
 movieDetails
);

router.post(
 "/save",
 saveMovie
);



module.exports = router;