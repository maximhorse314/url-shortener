import rateLimit from "express-rate-limit";

export const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 100,
  message: {
    error: "Too many requests, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const shortenRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 min
  max: 10,
  message: {
    error: "Too many requests, please slow down.",
  }
});
