import { validationResult } from "express-validator";

const validate = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    const err = new Error("Validation failed");
    err.statusCode = 400;
    err.details = error.array();
    throw err;
  }
  next();
};

export default validate;
