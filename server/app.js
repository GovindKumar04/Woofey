import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import { router } from "./routes/user.routes.js";
const app= express();

app.set("trust proxy", 1);
app.use(cors({ origin: process.env.FRONTEND_URL, // React frontend
  credentials: true, }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use("/api/v1/user", router)

export {app}