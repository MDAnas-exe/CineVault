import express from "express";
import protect from "../middlewares/authMiddleware.js";
import {
  manageLiked,
  manageWatched,
  manageWatchlisted,
  getLiked,
  getWatchlisted,
  getWatched,
  getUserMovieStatus,
  getUserMe,
  getUserProfile,
  manageReview,
  deleteReview,
  getUserReviews,
  getUserReviewForMovie,
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
  getMovieReviewValidator,
} from "../utils/validators/reviewValidators.js";
import validate from "../middlewares/validationMiddleware.js";
import {
  userWriteLimiter,
  userReadLimiter,
} from "../middlewares/rateLimitMiddleware.js";

const router = express.Router();

router.get("/me", protect, userReadLimiter, getUserMe);
router.get("/profile", protect, userReadLimiter, getUserProfile);

router.patch(
  "/liked/:id",
  protect,
  userWriteLimiter,
  movieInfoValidator,
  validate,
  manageLiked,
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
  "/watchlisted/:id",
  protect,
  userWriteLimiter,
  movieInfoValidator,
  validate,
  manageWatchlisted,
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
  "/watchlisted",
  protect,
  userReadLimiter,
  queryValidators,
  validate,
  getWatchlisted,
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

router.get(
  "/reviews/:movieId",
  protect,
  userReadLimiter,
  getMovieReviewValidator,
  validate,
  getUserReviewForMovie,
);

export default router;
