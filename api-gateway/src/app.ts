import express from "express";
import morgan from 'morgan'
import { rateLimiter } from "./middleware/rateLimiter.js";
import { gatewayAuth } from "./middleware/gatewayAuth.js";
import {userProxy , userAuthProxy} from './routes/userProxy.js'
import { orderProxy } from "./routes/orderProxy.js";
import { metricsMiddleware } from "./infrastructure/monitoring/metricsMiddleware.js";
import { register } from "./infrastructure/monitoring/metrics.js";
export const app = express()

app.get("/metrics", async (req, res) => {
    res.set("Content-Type", register.contentType)
    res.end(await register.metrics())
})
app.use(metricsMiddleware)
app.use(morgan(":method :url :status :response-time ms"))
app.use(rateLimiter)
app.use(gatewayAuth);

app.use("/api/auth", userAuthProxy);
app.use("/api/users", userProxy);
app.use("/api/orders",orderProxy)


app.get("/", (req, res) => {
    res.send("API Gateway is running");
});

