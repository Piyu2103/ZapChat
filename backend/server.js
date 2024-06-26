import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";

import authRoutes from "./routes/auth.js";
import messageRoutes from "./routes/message.js";
import userRoutes from "./routes/user.js"

import connectToMongoDB from "./db/connectToMongoDB.js";
import globalErrorHandler from "./middlewares/errorMiddleware.js";
import { app,server } from "./socket/socket.js";

dotenv.config();

const __dirname=path.resolve();

const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users",userRoutes);
app.use(globalErrorHandler);

app.use(express.static((path.join(__dirname,"/frontend/dist"))))

app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"/frontend/dist/index.html"))
})

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on the port ${PORT}`);
});
