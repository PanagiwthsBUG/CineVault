const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  addToWatchlist,
  getWatchlist,
} = require("../controllers/watchlistController");

router.post(
  "/",
  authMiddleware,
  addToWatchlist
);

router.get(
  "/",
  authMiddleware,
  getWatchlist
);

module.exports = router;

