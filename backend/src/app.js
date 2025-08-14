import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

const app = express();

// Core middleware
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

// Health check (for Postman & uptime monitors)
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// Centralized error handler
app.use((err, req, res, _next) => {
  // eslint-disable-next-line no-console
  console.error(err);
  res.status(err.statusCode || 500).json({ error: err.message || "Internal Server Error" });
});

export default app;