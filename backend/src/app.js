import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { errors as celebrateErrors } from "celebrate";
import router from "./routes/index.js";

const app = express();

// Core middleware
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || true, credentials: false }));
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

// Basic rate limit
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);

// Health check (for Postman & uptime monitors)
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// API routes
app.use("/api", router);

// Celebrate validation errors
app.use(celebrateErrors());

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// Centralized error handler
app.use((err, req, res, _next) => {
  console.error(err);
  res
    .status(err.statusCode || 500)
    .json({ error: err.message || "Internal Server Error" });
});

export default app;
