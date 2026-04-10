import rateLimit from "express-rate-limit";

export const quizLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 quiz submissions per IP per window
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many quiz submissions. Please try again in 15 minutes." },
});

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests. Please try again later." },
});
