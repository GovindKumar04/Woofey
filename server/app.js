import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router } from "./routes/user.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.set("trust proxy", 1);

const allowedOrigins = [
  "https://woofey-4ks8.vercel.app",
  "https://woofey-4ks8-7nhyopj2l-govindkumar04s-projects.vercel.app",
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // allow non-browser tools (no origin), whitelisted origins,
      // and any localhost port during development
      const isLocalhost =
        origin && /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
      if (!origin || allowedOrigins.includes(origin) || isLocalhost) {
        return callback(null, true);
      }
      return callback(new Error(`CORS blocked: ${origin}`));
    },
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

// Must be registered after all routes
app.use(errorHandler);

export { app };
