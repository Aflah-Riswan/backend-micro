import { createProxyMiddleware } from "http-proxy-middleware";

export const userAuthProxy = createProxyMiddleware({
    target:  process.env.USER_SERVICE_URL,
    changeOrigin: true,

    pathRewrite: {
        "^/": "/auth/"
    }
});

export const userProxy = createProxyMiddleware({
    target:  process.env.USER_SERVICE_URL,
    changeOrigin: true,

    pathRewrite: {
        "^/": "/users/"
    }
});