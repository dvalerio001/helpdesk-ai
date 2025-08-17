import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import { errors as celebrateErrors } from "celebrate";

import authRoutes from "./routes/auth.js"; // /signup, /signin  (public)
import userRoutes from "./routes/users.js"; // /users/*
import snippetRoutes from "./routes/snippets.js"; // /snippets/*
import aiRoutes from "./routes/ai.js"; // /ai/generate

const app = express();

const allow = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const corsOptions = {
  origin(origin, cb) {
    if (!origin) return cb(null, true); // server-to-server / health checks
    if (allow.includes(origin)) return cb(null, true);
    return cb(new Error("Not allowed by CORS"));
  },
  credentials: false,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions)); // <-- changed from "*" to /.*/

app.use(helmet());
app.use(express.json({ limit: "1mb" }));
app.use(morgan("combined"));
app.use(rateLimit({ windowMs: 60_000, max: 100 }));

app.get("/api/health", (_req, res) => res.json({ ok: true }));

// Routes (mount everything under /api)
app.use("/api", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/snippets", snippetRoutes);
app.use("/api/ai", aiRoutes);

// celebrate() validation errors
app.use(celebrateErrors());

// Centralized error handler
app.use((err, _req, res, _next) => {
  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({ error: "CORS: origin not allowed" });
  }
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Server error";
  res.status(status).json({ error: message });
});

export default app;
