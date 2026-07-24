import { body, param, query } from "express-validator";

export const upsertReviewValidator = [
  param("movieId")
    .toInt()
    .isInt({ min: 1 })
    .withMessage("Movie ID must be a positive integer"),
  body("review")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Review content is required")
    .isLength({ max: 2000 })
    .withMessage("Review content must be 2000 characters or fewer")
    .escape(),
];

export const deleteReviewValidator = [
  param("movieId")
    .toInt()
    .isInt({ min: 1 })
    .withMessage("Movie ID must be a positive integer"),
];

export const getReviewsQueryValidator = [
  query("page")
    .optional()
    .toInt()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),
];
