import express from "express";
import { registerUser, loginUser } from "../Controllers/usersController.js";
import { loginValidator } from "../validators/AuthValidators.js";
import validate from "../Middlewares/validationMiddleware.js";

const router = express.Router();

router.post(`/signup`, registerUser);
router.post(`/login`, loginValidator, validate, loginUser);

export default router;
