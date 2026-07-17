import { body } from "express-validator";

const loginValidator = [
  body("password").notEmpty().withMessage("password required"),
  body("email").isEmail().normalizeEmail(),
];

export { loginValidator };
