import { body } from "express-validator";

const loginValidator = [
  body("password").notEmpty().withMessage("password required"),
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Incorrect Email format"),
];

const registerValidator = [
  body("password")
    .trim()
    .isLength({ max: 128, min: 8 })
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
  body("email").isEmail().normalizeEmail(),
  body("name").trim().notEmpty().isLength({ max: 50 }),
];

export { loginValidator, registerValidator };
