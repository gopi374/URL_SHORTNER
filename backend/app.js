import express from 'express';

const app = express();

app.get("/",(req,res)=>{
    res.json({
        status:"Active...",
        message:"Server is listening...",
    })
})

app.listen(3000,()=>{
    console.log(`Server is Runing on PORT : http://localhost:3000`)
})