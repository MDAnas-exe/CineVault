import { body, param } from "express-validator";

const patchValidators = [
  param("id")
    .isNumeric({ no_symbols: true })
    .withMessage("id must be postive integers only"),

  body("movieInfo.title")
    .trim()
    .notEmpty()
    .isString()
    .escape()
    .isLength({ max: 200 })
    .optional(),
];
