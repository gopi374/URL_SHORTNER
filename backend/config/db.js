import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();


export const db = mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log(`✅ DB Connected Successfully !!`)
})
.catch(err=>{
    console.log(err)
})

