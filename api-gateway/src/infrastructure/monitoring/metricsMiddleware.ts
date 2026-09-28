import { Request, Response, NextFunction } from 'express'

import {
    httpRequestDuration,
    httpRequestTotal
} from './metrics.js'

export const metricsMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const start = process.hrtime()

    res.on('finish', () => {

        const [seconds, nanoseconds] = process.hrtime(start)

        const duration = seconds + nanoseconds / 1e9

        const route = req.route?.path || req.path
        const statusCode = res.statusCode.toString()

        httpRequestTotal
            .labels(req.method, route, statusCode)
            .inc()

        httpRequestDuration
            .labels(req.method, route, statusCode)
            .observe(duration)
    })

    next()
}