import express from 'express'
import { metricsMiddleware } from './infrastructure/monitoring/metricsMiddleware.js'
import { register } from './infrastructure/monitoring/metrics.js'

const app = express()
app.use(express.json())

app.use(metricsMiddleware)

app.get('/metrics', async (req, res) => {
    res.set('Content-Type', register.contentType)
    res.end(await register.metrics())
})

export default app