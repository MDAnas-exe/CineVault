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
} from "../utils/validators/UserMovieValidators.js";
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

export default router;
