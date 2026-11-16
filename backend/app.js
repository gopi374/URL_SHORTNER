import express from 'express';
import cors from "cors";
import { db } from './config/db.js';
const app = express();

app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.json({
        status:"Active...",
        message:"Server is listening...",
    })
})

app.listen(3000,()=>{
    db;
    console.log(`Server is Runing on PORT : http://localhost:3000`)
})