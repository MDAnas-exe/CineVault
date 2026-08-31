import rateLimit from "express-rate-limit";

const createLimiter = (options) =>
  rateLimit({
    windowMs: 15 * 60 * 1000,
    message: { message: "Too many requests, please try again later." },
    ...options,
  });

const authLimiter = createLimiter({ max: 10 });

const movieLimiter = createLimiter({ max: 300 });

const userWriteLimiter = createLimiter({
  max: 100,
  keyGenerator: (req) => req.user._id.toString(),
});

const userReadLimiter = createLimiter({
  max: 200,
  keyGenerator: (req) => req.user._id.toString(),
});

export { authLimiter, movieLimiter, userWriteLimiter, userReadLimiter };
