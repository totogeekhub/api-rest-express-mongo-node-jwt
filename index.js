import * as dotenv from "dotenv";
import "./database/connectdb.js";
import express from "express";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth", authRouter);

// Solo para el ejemplo de login/token
app.use(express.static("public"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("onfire!! 🔥🔥🔥 http://localhost:" + PORT));
