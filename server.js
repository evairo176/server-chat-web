const express = require("express");
const authRoutes = require("./src/route/auth/authRoutes");
const dotenv = require("dotenv");
var cors = require("cors");
dotenv.config();
const {
  notFound,
  errorHandler,
} = require("./src/middleware/error/errorHandler");
const dbConnect = require("./src/config/database");
const app = express();

dbConnect();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);

// error handler
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 2000;

app.listen(PORT, () => {
  console.log("Server is running on port:" + PORT);
  console.log("http://localhost:" + PORT);
});
