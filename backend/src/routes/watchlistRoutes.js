const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  addToWatchlist,
  getWatchlist,
  updateWatchlistStatus,
  deleteFromWatchlist,
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

router.put(
  "/:id",
  authMiddleware,
  updateWatchlistStatus
);


router.delete(
  "/:id",
  authMiddleware,
  deleteFromWatchlist
);

module.exports = router;

