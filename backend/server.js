import express from "express"
import "dotenv/config"
import cors from "cors"
import connectDB from "./configs/db.js"
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from "./controller/clerkWebhooks.js"
import userRouter from "./routes/userRoutes.js"
import hotelRouter from "./routes/hotelRoutes.js"
import connectCloudinary from "./configs/cloudinary.js"
import roomRouter from "./routes/roomRoutes.js"
import bookingRouter from "./routes/bookingRoutes.js"

connectDB(); // connection to DB
connectCloudinary(); //connection to Cloudinary for images
const app = express()
app.use(cors()) // enable cross-origin resource sharing

//Middleware
app.use(express.json())
app.use(clerkMiddleware()) 

// API to listen clerk webhook
app.use("/api/clerk",clerkWebhooks)
app.get('/',(req,res)=>res.send("API is working fine"))
app.use('/api/user',userRouter)
app.use('/api/hotels',hotelRouter);
app.use('/api/rooms',roomRouter);
app.use('/api/bookings',bookingRouter);


const PORT = process.env.PORT || 3000;

app.listen(PORT,()=> console.log(`Server Running on ${PORT}`));// start the backend

