import express from "express";
import dotenv from "dotenv";
import morgan from 'morgan'
import rateLimit from "express-rate-limit";

dotenv.config();

const app = express();

const PORT = process.env.PORT ;



const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        message: "Too many requests, please try again later."
    }
});

app.use(morgan(":method :url :status :response-time ms"));
app.use(limiter)

app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});