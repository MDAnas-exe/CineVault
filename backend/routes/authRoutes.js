import express from "express";
import {
  registerController,
  loginController,
  verifyEmail,
  logoutController,
} from "../controllers/authController.js";
import {
  loginValidator,
  registerValidator,
} from "../utils/validators/authValidators.js";
import validate from "../middlewares/validationMiddleware.js";
import { authLimiter } from "../middlewares/rateLimitMiddleware.js";

const router = express.Router();

router.post(
  `/signup`,
  authLimiter,
  registerValidator,
  validate,
  registerController,
);
router.post(`/login`, authLimiter, loginValidator, validate, loginController);
router.post("/verify-email", authLimiter, verifyEmail);
router.post("/logout", authLimiter, logoutController);

export default router;
