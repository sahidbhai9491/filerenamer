import express from "express";
import "dotenv/config";
import dbConnect from "./db/index.js";
import cors from "cors";
import compression from "compression";
import userRouter from "./routes/user.route.js";
import { configureCloudinary } from "./utils/cloudinary.js";

const app = express();
const PORT = process.env.PORT || 3000;

// 1. FIRST connect to database
await dbConnect();
configureCloudinary();

app.use(compression());
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ limit: '16kb' }));

app.use(cors({
    origin: ['https://www.speedways.uk', 'https://speedways.uk', 'https://speedwaysuk-frontend.onrender.com', 'http://localhost:5173'],
    credentials: true,
}));

// Health check
app.get('/api/v1/health', (req, res) => {
    res.status(200).json({ 
        status: 'ok', 
        agenda: agendaStarted ? 'running' : 'failed'
    });
});

// Your API routes
app.use('/api/v1/users', userRouter);

// 404 handler - SIMPLIFIED VERSION
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.method} ${req.originalUrl} not found`
    });
});

// Global error handler
app.use((error, req, res, next) => {
    console.error('Unhandled error:', error);
    res.status(500).json({ 
        success: false,
        message: 'Internal server error'
    });
});

const server = app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});