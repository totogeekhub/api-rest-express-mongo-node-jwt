import * as dotenv from "dotenv";
import "./database/connectdb.js";
import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors'

import authRouter from "./routes/auth.route.js";
import linkRouter from "./routes/link.route.js";
import redirectRouter from "./routes/redirect.route.js";

const app = express();

const whiteList = [
    process.env.ORIGIN1,
    process.env.ORIGIN2

]

// app.use(cors({
//     origin: [
//         process.env.ORIGIN1
//     ]
// }))

app.use(cors({
    origin: function(origin, callback) {
        if(whiteList.includes(origin)) {
            return callback(null, origin)
        }
        return callback('Error de CORS origin:' + origin + ' No autorizado ⚔')
    }
}))

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/links", linkRouter);

// ejemplo back redirect (opcional)
app.use("/", redirectRouter);

// Solo para el ejemplo de login/token
// app.use(express.static("public"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("onfire!! 🔥🔥🔥 http://localhost:" + PORT));
