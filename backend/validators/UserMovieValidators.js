import { body, param } from "express-validator";

const movieInfoValidator = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("Movie id must be a positive integer"),

  body("movieInfo").optional().isObject().withMessage("movieInfo must be an object"),

  body("movieInfo.title")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("title must not be empty")
    .isLength({ max: 200 })
    .withMessage("title must be 200 characters or fewer"),

  body("movieInfo.posterPath")
    .optional()
    .isString()
    .trim()
    .withMessage("posterPath must be a string"),

  body("movieInfo.releaseDate")
    .optional()
    .isString()
    .trim()
    .withMessage("releaseDate must be a string"),

  body("movieInfo.genres")
    .optional()
    .isArray()
    .withMessage("genres must be an array"),

  body("movieInfo.genres.*")
    .isInt({ min: 1 })
    .withMessage("each genre must be a valid genre id"),

  body("movieInfo.popularity")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("popularity must be a non-negative number"),
];

export { movieInfoValidator };
