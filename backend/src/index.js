const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://mongodb:27017/citymate")
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB error:", err));



// start server
const PORT = 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});