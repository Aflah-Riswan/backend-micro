import  { createProxyMiddleware } from 'http-proxy-middleware'

export const orderProxy = createProxyMiddleware({
    target : process.env.ORDER_SERVICE_URL,
    changeOrigin : true,
    pathRewrite: (path) => `/orders${path}`
})