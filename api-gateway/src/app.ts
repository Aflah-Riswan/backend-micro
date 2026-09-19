import express from "express";
import morgan from 'morgan'
import { rateLimiter } from "./middleware/rateLimiter";
import { gatewayAuth } from "./middleware/gatewayAuth";
import {userProxy , userAuthProxy} from './routes/userProxy'
import { orderProxy } from "./routes/orderProxy";
export const app = express()
app.use(morgan(":method :url :status :response-time ms"))
app.use(rateLimiter)
app.use(gatewayAuth);

app.use("/api/auth", userAuthProxy);
app.use("/api/users", userProxy);
app.use("/api/orders",orderProxy)
app.get("/", (req, res) => {
    res.send("API Gateway is running");
});

