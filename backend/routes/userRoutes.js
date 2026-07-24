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
  getUserProfile,
  manageReview,
  deleteReview,
  getUserReviews,
} from "../controllers/userController.js";
import {
  movieInfoValidator,
  queryValidators,
  movieStatusValidator,
} from "../utils/validators/userMovieValidators.js";
import {
  upsertReviewValidator,
  deleteReviewValidator,
  getReviewsQueryValidator,
} from "../utils/validators/reviewValidators.js";
import validate from "../middlewares/validationMiddleware.js";
import {
  userWriteLimiter,
  userReadLimiter,
} from "../middlewares/rateLimitMiddleware.js";

const router = express.Router();

router.get("/me", protect, userReadLimiter, getUserProfile);

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

router.put(
  "/reviews/:movieId",
  protect,
  userWriteLimiter,
  upsertReviewValidator,
  validate,
  manageReview,
);

router.delete(
  "/reviews/:movieId",
  protect,
  userWriteLimiter,
  deleteReviewValidator,
  validate,
  deleteReview,
);

router.get(
  "/reviews",
  protect,
  userReadLimiter,
  getReviewsQueryValidator,
  validate,
  getUserReviews,
);

export default router;
