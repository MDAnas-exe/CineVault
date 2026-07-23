import express from "express";
import protect from "../middlewares/authMiddleware.js";
import {
  manageLikes,
  manageWatched,
  manageWatchlist,
  getLiked,
  getWatchlist,
  getWatched,
  getUserMovieStatus,
} from "../controllers/userController.js";
import {
  movieInfoValidator,
  queryValidators,
  movieStatusValidator,
} from "../utils/validators/userMovieValidators.js";
import validate from "../middlewares/validationMiddleware.js";
import {
  userWriteLimiter,
  userReadLimiter,
} from "../middlewares/rateLimitMiddleware.js";

const router = express.Router();

router.patch(
  "/likes/:id",
  protect,
  userWriteLimiter,
  movieInfoValidator,
  validate,
  manageLikes,
);
router.patch(
  "/watched/:id",
  protect,
  userWriteLimiter,
  movieInfoValidator,
  validate,
  manageWatched,
);
router.patch(
  "/watchlist/:id",
  protect,
  userWriteLimiter,
  movieInfoValidator,
  validate,
  manageWatchlist,
);

router.get(
  "/liked",
  protect,
  userReadLimiter,
  queryValidators,
  validate,
  getLiked,
);
router.get(
  "/watched",
  protect,
  userReadLimiter,
  queryValidators,
  validate,
  getWatched,
);
router.get(
  "/watchlist",
  protect,
  userReadLimiter,
  queryValidators,
  validate,
  getWatchlist,
);

router.get(
  "/movie-status",
  protect,
  userReadLimiter,
  movieStatusValidator,
  validate,
  getUserMovieStatus,
);

export default router;
