import express, { Router } from "express";
import protect from "../middlewares/authMiddleware.js";
import { manageLikes, manageWatched, manageWatchlist } from "../controllers/userController.js";

const router = express.Router();

router.patch("/likes/:id", protect, manageLikes);
router.patch("/watched/:id", protect, manageWatched);
router.patch("/watchlist/:id", protect, manageWatchlist);

export default router;
