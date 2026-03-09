import express from "express";
import { connectDB } from "./config/db";

const app = express();

connectDB();

app.get("/", (_req, res) => {
  res.send("API working");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});