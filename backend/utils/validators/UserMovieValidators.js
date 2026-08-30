import { body, param, query } from "express-validator";
import { GENRES } from "../../constants/genres.js";

const movieStatusUpdateValidator = [
  param("id")
    .toInt()
    .isInt({ min: 1 })
    .withMessage("Movie id must be a positive integer"),

  body("value")
    .exists()
    .withMessage("value is required")
    .bail()
    .isBoolean({ strict: true })
    .withMessage("value must be a boolean"),

  body("movieInfo")
    .optional()
    .isObject()
    .withMessage("movieInfo must be an object"),

  body("movieInfo.title")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("title must not be empty")
    .isLength({ max: 200 })
    .withMessage("title must be 200 characters or fewer")
    .escape(),

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
    .optional()
    .toInt()
    .isInt({ min: 1 })
    .withMessage("each genre must be a valid genre id"),

  body("movieInfo.popularity")
    .optional()
    .toFloat()
    .isFloat({ min: 0 })
    .withMessage("popularity must be a non-negative number"),
];

const queryValidators = [
  query(["fromYear", "toYear"])
    .optional()
    .toInt()
    .isInt({ min: 1900, max: 2100 })
    .withMessage("Year must be between 1900 and 2100"),

  query("toYear")
    .optional()
    .custom((value, { req }) => {
      const min = Number(req.query.fromYear);
      const max = Number(value);
      if (max < min) throw new Error("Invalid Year Range");
      else return true;
    }),

  query("sortBy")
    .optional()
    .isIn(["title", "releaseDate", "popularity", "dateAdded"])
    .withMessage("Invalid sort field"),

  query("order").optional().toLowerCase().isIn(["desc", "asc"]),

  query("page").optional().toInt().isInt({ min: 1 }),
];

const movieStatusValidator = [
  query("ids")
    .customSanitizer((v) => v.split(","))
    .isArray({ max: 20 })
    .custom((arr) => arr.every((a) => Number(a) > 0)),
];

export { movieStatusUpdateValidator, queryValidators, movieStatusValidator };
