import { param, query } from "express-validator";

export const movieIdParamValidator = [
  param("id")
    .toInt()
    .isInt({ min: 1 })
    .withMessage("Movie ID must be a positive integer"),
];

export const searchQueryValidator = [
  query("name")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Search query 'name' is required")
    .escape(),
  query("page")
    .optional()
    .toInt()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),
];

export const paginationQueryValidator = [
  query("page")
    .optional()
    .toInt()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),
];
