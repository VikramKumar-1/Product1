require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");

const PORT = 5000;

// connect database
connectDB();

// start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});