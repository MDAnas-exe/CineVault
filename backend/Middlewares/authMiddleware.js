import jwt from "jsonwebtoken";
import user from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";

const protect = expressAsyncHandler(async (req, res, next) => {
  let { token } = req.cookies;

  if (!token) {
    res.status(400);
    throw new Error("No token!not Authorised");
  }

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await user.findById(id).select("_id name email isVerified");
    next();
  } catch (err) {
    res.status(400);
    if (err.name === "TokenExpiredError")
      throw new Error("Session expired please Login again");
    if (err.name === "JsonWebTokenError")
      throw new Error("Invalid Token please login with a valid token");
    throw new Error(err.message);
  }
});

export default protect;
