import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import "dotenv/config";

import { startDB } from "./src/config/database.js";

const app = express();
const PORT = process.env.PORT || 3003;

app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.listen(PORT, async () => {
    await startDB();
    console.log(`Servidor funcionando, en el puerto ${PORT}`);
});