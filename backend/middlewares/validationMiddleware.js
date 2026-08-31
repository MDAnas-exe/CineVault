import { validationResult } from "express-validator";

const validate = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    res.status(400);
    const err = new Error("Validation failed");
    err.details = error.array();
    throw err;
  }
  next();
};

export default validate;
