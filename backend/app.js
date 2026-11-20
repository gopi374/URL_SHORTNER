import express from 'express';
import cors from "cors";
import dotenv from "dotenv";
import { db } from './config/db.js';
import apiRouter from './routes/api.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Mount URL Shortener routes
app.use("/", apiRouter);

app.get("/health", (req, res) => {
    res.json({
        status: "Active",
        message: "Server is healthy and listening...",
        timestamp: new Date().toISOString()
    });
});

app.listen(PORT, () => {
    db;
    console.log(`Server is running on PORT : http://localhost:${PORT}`);
});
