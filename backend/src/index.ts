import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { apiLimiter } from "./middleware/rateLimiter.js";
import { errorHandler } from "./middleware/errorHandler.js";
import leadsRouter from "./routes/leads.js";
import productsRouter from "./routes/products.js";
import authRouter from "./routes/auth.js";
import statsRouter from "./routes/stats.js";
import articlesRouter from "./routes/articles.js";

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || "4000");

// Trust proxy (required for Railway + rate limiting)
app.set("trust proxy", 1);

// Security
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

// Rate limiting
app.use("/api/", apiLimiter);

// Body parsing
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString(), service: "creditmatch-api" });
});

// Routes
app.use("/api/leads", leadsRouter);
app.use("/api/products", productsRouter);
app.use("/api/articles", articlesRouter);
app.use("/api/admin/auth", authRouter);
app.use("/api/admin/stats", statsRouter);

// 404
app.use((_req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Global error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 CreditMatch API running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || "development"}`);
});

export default app;
