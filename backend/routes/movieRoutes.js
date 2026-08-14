import express from "express";
import getMovies, { getMovieReviews } from "../controllers/movieController.js";
import { movieLimiter } from "../middlewares/rateLimitMiddleware.js";
import validate from "../middlewares/validationMiddleware.js";
import {
  movieIdParamValidator,
  searchQueryValidator,
  paginationQueryValidator,
} from "../utils/validators/movieValidators.js";
import { getReviewsQueryValidator } from "../utils/validators/reviewValidators.js";
import optionalAuth from "../middlewares/optionalAuthMiddleware.js";

const router = express.Router();

router.get(
  "/trending",
  movieLimiter,
  paginationQueryValidator,
  validate,
  getMovies(`trending/movie/week`),
);

router.get(
  "/top_rated",
  movieLimiter,
  paginationQueryValidator,
  validate,
  getMovies(`movie/top_rated`),
);

router.get(
  "/search",
  movieLimiter,
  searchQueryValidator,
  validate,
  getMovies(`search/movie`),
);

router.get(
  "/:id/reviews",
  movieLimiter,
  movieIdParamValidator,
  getReviewsQueryValidator,
  validate,
  optionalAuth,
  getMovieReviews,
);

router.get(
  "/:id/credits",
  movieLimiter,
  movieIdParamValidator,
  validate,
  getMovies((req) => `movie/${req.params.id}/credits`),
);

router.get(
  "/:id/releaseinfo",
  movieLimiter,
  movieIdParamValidator,
  validate,
  getMovies((req) => `movie/${req.params.id}/release_dates`),
);

router.get(
  "/:id",
  movieLimiter,
  movieIdParamValidator,
  validate,
  getMovies((req) => `movie/${req.params.id}`),
);

export default router;
