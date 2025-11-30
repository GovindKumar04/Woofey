import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import { router } from "./routes/user.routes.js";
const app= express();

app.use(cors({origin: "http://localhost:3000", // React frontend
  credentials: true, }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use("/api/v1/user", router)

export {app}