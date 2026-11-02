import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import "dotenv/config";

import userRouter from "./src/routes/user.routes.js";
import authRouter from "./src/routes/auth.routes.js";
import categoryRouter from "./src/routes/category.routes.js";
import eventRouter from "./src/routes/event.routes.js";

import { startDB } from "./src/config/database.js";

const app = express();
const PORT = process.env.PORT || 3003;

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/events", eventRouter);

app.listen(PORT, async () => {
    await startDB();
    console.log(`Servidor funcionando, en el puerto ${PORT}`);
});