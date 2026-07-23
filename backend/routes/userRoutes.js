import express from "express";
import protect from "../middlewares/authMiddleware.js";
import {
  manageLikes,
  manageWatched,
  manageWatchlist,
  getLiked,
  getWatchlist,
  getWatched,
} from "../controllers/userController.js";
import {
  movieInfoValidator,
  queryValidators,
} from "../validators/UserMovieValidators.js";
import validate from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.patch("/likes/:id", protect, movieInfoValidator, validate, manageLikes);
router.patch(
  "/watched/:id",
  protect,
  movieInfoValidator,
  validate,
  manageWatched,
);
router.patch(
  "/watchlist/:id",
  protect,
  movieInfoValidator,
  validate,
  manageWatchlist,
);

router.get("/liked", protect, queryValidators, validate, getLiked);
router.get("/watched", protect, queryValidators, validate, getWatched);
router.get("/watchlist", protect, queryValidators, validate, getWatchlist);

export default router;
