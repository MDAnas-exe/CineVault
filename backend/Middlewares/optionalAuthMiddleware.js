import jwt from "jsonwebtoken";

const optionalAuth = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) return next();

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = id;
  } catch {
    // expired, malformed, or invalid — treat as unauthenticated
  }

  next();
};

export default optionalAuth;
