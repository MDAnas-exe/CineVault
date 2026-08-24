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

  query("sortBy")
    .optional()
    .isIn(["createdAt", "updatedAt"])
    .withMessage("Sort field must be createdAt or updatedAt"),

  query("order")
    .optional()
    .toLowerCase()
    .isIn(["asc", "desc"])
    .withMessage("Order must be asc or desc"),

  query(["fromDate", "toDate"])
    .optional()
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .withMessage("Date must use YYYY-MM-DD format")
    .bail()
    .isISO8601({ strict: true, strictSeparator: true })
    .withMessage("Date must be valid"),

  query("toDate")
    .optional()
    .custom((value, { req }) => {
      if (req.query.fromDate && value < req.query.fromDate) {
        throw new Error("toDate must not be earlier than fromDate");
      }

      return true;
    }),
];
