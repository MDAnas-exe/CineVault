import express, { Router } from "express";
import getMovies from "../Controllers/movieController.js";
const router = express.Router();

router.get("/trending", getMovies(`trending/movie/week`));
router.get("/top_rated", getMovies(`movie/top_rated`));
router.get("/search", getMovies(`search/movie`));

router.get(
  "/:id",
  getMovies((req) => `movie/${req.params.id}`),
);

router.get(
  "/credits/:id",
  getMovies((req) => `movie/${req.params.id}/credits`),
);

router.get(
  "/releaseinfo/:id",
  getMovies((req) => `movie/${req.params.id}/release_dates`),
);

export default router;
