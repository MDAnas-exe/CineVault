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
import { movieInfoValidator } from "../validators/UserMovieValidators.js";
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

router.get("/liked", protect, getLiked);
export default router;
