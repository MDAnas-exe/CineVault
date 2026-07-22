import express from "express";
import {
  registerController,
  loginController,
  verifyEmail,
} from "../controllers/authController.js";
import {
  loginValidator,
  registerValidator,
} from "../validators/authValidators.js";
import validate from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.post(`/signup`, registerValidator, validate, registerController);
router.post(`/login`, loginValidator, validate, loginController);
router.post("/verify-email", verifyEmail);

export default router;
