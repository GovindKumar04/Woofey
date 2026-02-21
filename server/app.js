const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { router } = require("./routes/user.routes.js");

const app = express();

app.set("trust proxy", 1);

app.use(
  cors({
    origin: process.env.FRONTEND_URL, // React frontend
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/user", router);

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

module.exports = { app };