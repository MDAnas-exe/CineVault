import express, { Router } from "express";
import getMovies from "../controllers/movieController.js";
import { movieLimiter } from "../middlewares/rateLimitMiddleware.js";
const router = express.Router();

router.get("/trending", movieLimiter, getMovies(`trending/movie/week`));
router.get("/top_rated", movieLimiter, getMovies(`movie/top_rated`));
router.get("/search", movieLimiter, getMovies(`search/movie`));

router.get(
  "/:id",
  movieLimiter,
  getMovies((req) => `movie/${req.params.id}`),
);

router.get(
  "/credits/:id",
  movieLimiter,
  getMovies((req) => `movie/${req.params.id}/credits`),
);

router.get(
  "/releaseinfo/:id",
  movieLimiter,
  getMovies((req) => `movie/${req.params.id}/release_dates`),
);

export default router;
