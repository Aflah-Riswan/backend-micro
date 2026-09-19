import  { createProxyMiddleware } from 'http-proxy-middleware'

export const orderProxy = createProxyMiddleware({
    target : "http://localhost:5000",
    changeOrigin : true,
    pathRewrite: (path) => `/orders${path}`
})