import express from 'express'
import dotenv from 'dotenv'

import authRoutes from "./routes/auth.js"
import connectToMongoDB from './db/connectToMongoDB.js'
import globalErrorHandler from './middlewares/errorMiddleware.js'

const PORT= process.env.PORT || 5000
const app=express()

dotenv.config()

app.use(express.json());
app.use("/api/auth",authRoutes);
app.use(globalErrorHandler);


app.listen(PORT,()=>{
    connectToMongoDB();
    console.log(`Server is running on the port ${PORT}`);
})