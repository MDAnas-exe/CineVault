import { body, param, query } from "express-validator";

export const upsertReviewValidator = [
  param("movieId")
    .toInt()
    .isInt({ min: 1 })
    .withMessage("Movie ID must be a positive integer"),
  body("movieTitle")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Movie title is required")
    .isLength({ max: 300 })
    .withMessage("Movie title must be 300 characters or fewer")
    .escape(),
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

export const getMovieReviewValidator = [
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
