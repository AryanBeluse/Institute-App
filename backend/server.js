import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from "mongoose";

import cookieParser from 'cookie-parser';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/admin.routes.js';
import authRouter from './routes/auth.routes.js';
import trainerRouter from './routes/trainer.routes.js';


// app config
const app = express();
const port = process.env.PORT || 4000;

const connectDB = async () => {

    mongoose.connection.on('connected', () => console.log("Database Connected")
    )
    await mongoose.connect(`${process.env.MONGODB_URI}`)
}
connectDB();
connectCloudinary();

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: "https://institute-app-frontend.onrender.com", // Example: "http://localhost:5173"
    credentials: true, // Allow cookies
}));
app.use(cookieParser());

app.use('/api/admin', adminRouter)
app.use('/api/trainer', trainerRouter)
app.use('/api/auth', authRouter)


app.get('/', (req, res) => {
    res.send("API is working");
});

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal server error"
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode
    })
})

app.listen(port, () => console.log("Server running on", port));
