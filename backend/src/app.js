const express = require("express");
const cors = require("cors");
require("./config/passport"); 

const authRoutes = require("./modules/auth/auth.routes");
const errorHandler = require("./middleware/errorHandler");
const { sendError} = require("./utils/response");
const HTTP         = require("./constants/httpStatus");
const MESSAGES     = require("./constants/messages");

const app = express();

// ── Core middleware ───────────────────────
app.use(cors());
 
/*app.use(cors({
  origin:      process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true,
}));*/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Routes ────────────────────────────────────────────
app.use("/api/auth", authRoutes);
 
app.get("/health", (_req, res) => res.json({ status: "ok" }));



// ── 404 ───────────────────────────────────────────────────────────────────────
app.use((_req, res) => sendError(res, HTTP.NOT_FOUND, MESSAGES.ROUTE_NOT_FOUND));
 
// ── Global error handler (must be last) ──────────────────────────────────────
app.use(errorHandler);


module.exports = app;